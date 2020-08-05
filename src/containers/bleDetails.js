import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    Button
} from 'react-native';
import { useRoute } from "@react-navigation/native";
import DeviceDetails from "./components/deviceDetails";
import { BleManager } from 'react-native-ble-plx';
import base64 from 'react-native-base64'


class BluetoothDetails extends React.Component {

    constructor(props) {
        super(props);
        this.manager = new BleManager();
        this.state = {
            progressState:"",
            deviceName:"",
            deviceId:"",
            serviceUUID:"",
            characteristicUUID:"",
            HeartBeatRate:"",
        };
      }

    componentDidMount() { 
        const { route } = this.props;
        console.log("Device Id:",route.params.device);
        this.setState({
            deviceName : route.params.device.name,
            deviceId : route.params.device.id,
        })

    }

    scanAndConnectToDevice(device) {
                this.setState({
            deviceName : device.name,
            deviceId : device.id,
            serviceUUID:"",
            characteristicUUID:""
        })
        console.log("Scanning Started for Device:",device.id);
        this.manager.startDeviceScan(null, null, (error, device) => {
          if (error) {
            // Handle error (scanning will be stopped automatically)
            console.log("Error in scanning devices:", error);
            return
          }
          // Check if it is a device you are looking for based on advertisement data
          // or other criteria.
          console.log("Detected Device Details:", device.id, device.name, device.localName);
          // ||device.localName === 'BLEPeripheralApp') (device.name === 'iPhone' || 
          if (device.name === 'Versa Lite'){
            // Stop scanning as it's not necessary if you are scanning for one device.
            console.log("Device Found, Stopping the Scan.");
            console.log("Connecting to:",device.name)
            this.manager.stopDeviceScan();
            device.connect()
              .then((device) => {
                console.log("Connected...Discovering services and characteristics");
                return device.discoverAllServicesAndCharacteristics()
              })
              .then(device => {
                console.log('Listening... ');
                console.log(device);
                this.readData(device);
              })
              .catch(error => {
                this.manager
                  .isDeviceConnected(device.id)
                  .then(res => console.log(res))
                  .catch(err => console.log(err));
    
                console.log(error.message);
                device.cancelConnection();
                //this.scanAndConnect();
              });
          }
        });
      }

    // async connectToBLE(device) {
    //     this.setState({
    //         deviceName : device.name,
    //         deviceId : device.id,
    //     })
    //     console.log("Connecting to Device:",device.name);
    //     const connectedDevice = await this.manager.connectToDevice(device.id)
    //     const services = await connectedDevice.discoverAllServicesAndCharacteristics()
    //     const characteristic = await this.readData(services)
    //     console.log("Characteristics:",characteristic);
    // }
    async readData(device) {
        const services = await device.services();
        console.log("Services:",services);
        const characteristics = await services[1].characteristics();
        // console.log(JSON.stringify(characteristicW));
        console.log("Characteristics:",characteristics);
        characteristics[0].monitor((err, update) => {
          if (err) {
            console.log(`characteristic error: ${err}`);
            console.log(JSON.stringify(err));
          } else {
            console.log("Is Characteristics Readable:",update.isReadable);
            console.log("Heart Rate Data:",base64.decode(update.value));
            // const readCharacteristic = await device.readCharacteristicForService(userDataServiceUUID, heightCharacteristicUUID); // assuming the device is already connected
            // var data = new Uint16Array(base64.decode(update.value));

            const heartRateData = Buffer.from(update.value, 'base64').readUInt16LE(0);
            console.log("Heart Beats:",heartRateData);
          }
        });
      }

    render(){
        return(
            <View>
                <DeviceDetails description="Device Name" data={this.state.deviceName}/>
                <DeviceDetails description="Device ID" data={this.state.deviceId}/>
                <DeviceDetails description="Service UUID" data={this.state.serviceUUID?"Fetching..":"Connect to Explore the Services"}/>
                <DeviceDetails description="Characteristics UUID" data={this.state.characteristicUUID?"Fetching..":"Connect to Explore the Characteristics"}/>
                <DeviceDetails description="Heart Rate" data={this.state.serviceUUID?"Fetching..":"Connect to Explore the Heart Rate"}/>
                <Button 
                    title="Connect"
                    onPress={() => {
                        const { route } = this.props;
                        console.log("Device Id:",route.params.device);
                        this.scanAndConnectToDevice(route.params.device)
                        }                        
                    }
                />
            </View>
        );
    }
}

export default function(props) {
    const route = useRoute();

  return <BluetoothDetails {...props} route={route} />;
};