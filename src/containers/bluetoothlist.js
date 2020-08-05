import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    FlatList,
    StyleSheet,
    SafeAreaView
} from 'react-native';
import Layout from "./components/bluetoothListLayout";
import Empty from "./components/Empty";
import Toogle from "./components/toggle";
import Subtitle from "./components/subtitle";
import Device from "./components/devices";
import { BleManager } from 'react-native-ble-plx';

class BluetoothList extends React.Component {

    constructor(props) {
        super(props);
        this.manager = new BleManager();
        this.state = {
            deviceList: [],
            isScanningEnabled: false,
            isScanningStarted: false,
            isInternetReachable: false,
            peripherals: null, // the peripherals detected
            connected_peripheral: null, // the currently connected peripheral  
        };
    }
    // componentDidMount() {
    //     this.enableBluetooth()
    // }
    enableBluetooth() {
        console.log("Checking for BLE Status...");
        const subscription = this.manager.onStateChange((state) => {
            if (state === 'PoweredOn') {
                this.scanAndConnect();
                subscription.remove();
            }
            else if (state === 'PoweredOff') {
                alert("Please Turn On your bluetooth.")
            } else if (state === 'Unauthorized') {
                alert("Your application needs Bluetooth to scan for devices, please turn on Bluetooth from App Settings.")
            }
        }, true);
    }
    scanAndConnect() {
        console.log("Scanning Started");
        this.manager.startDeviceScan(null, null, (error, device) => {
            if (error) {
                // Handle error (scanning will be stopped automatically)
                console.log("Error in scanning devices:", error);
                alert(error)
                return
            }
            console.log("Detected Device Details:", device.id, device.name, device.localName);
            const newArray = [];
            let filteredArray = [...this.state.deviceList, { id: device.id, name: device.name, localName: device.localName, rssi: device.rssi}]
            filteredArray.forEach(obj => {
                if (!newArray.some(o => o.id === obj.id)) {
                    newArray.push({ ...obj })
                }
            });
            this.setState({
                deviceList: newArray
            })
        });
    }
    stopDeviceScan() {
        this.manager.stopDeviceScan()
    }
    toogleScanButton = (value) => {
        if (value) {
            this.setState({
                isScanningEnabled: true
            })
            this.enableBluetooth()
        } else {
            this.setState({
                isScanningEnabled: false,
                deviceList: []
            })
            this.stopDeviceScan()
        }
    }
    renderEmpty = () => <Empty text="No Bluetooth Elements" />;
    returnKey(item) {
        return item.id;
    }
    navigateToBLEDetailScreen(device){
        //this.stopDeviceScan()
        const { navigate } = this.props.navigation;
        navigate("BLE Details",{device: device})
    }
    renderItems = ({ item }) => {
        return <Device {...item} iconLeft={require('../containers/assets/iconLeft.png')} onPress={ () => this.navigateToBLEDetailScreen(item)}/>
    };

    render() {
       return (
        <SafeAreaView style={styles.MainContainer}>
            <View style={styles.elementsContainer}>
                <Layout title="Scan for BLE">
                        <Toogle value={this.state.isScanningEnabled} onValueChange={this.toogleScanButton} />
                        <Subtitle title="List of Devices" />
                        <FlatList
                            data={this.state.deviceList}
                            keyExtractor={this.returnKey}
                            ListEmptyComponent={this.renderEmpty}
                            renderItem={this.renderItems}
                        />
                    </Layout>
            </View>
        </SafeAreaView>
        );
    }

}

const styles = StyleSheet.create({
    MainContainer: {
      flex: 1,
      backgroundColor: 'white',
    },
    elementsContainer: {
        marginTop: 0
    }
});

export default BluetoothList;
// function BluetoothList(props) {

//     const [list, setList] = useState([])
//     const [BLEEnable, setBLEEnable] = useState(false)
//     const bleManager = new bleManager
    // const List = [{
    //     name: 'Christian',
    //     key: '1'
    // }, {
    //     name: 'Maddy',
    //     key: '2'
    // },
    // {
    //     name: 'Chester',
    //     key: '3'
    // },
    // {
    //     name: 'Mike',
    //     key: '4'
    // },
    // {
    //     name: 'Jeo',
    //     key: '5'
    // }, {
    //     name: 'Han',
    //     key: '6'
    // },
    // {
    //     name: 'Salts',
    //     key: '7'
    // }
    // ];



//     useEffect(() => {
//         async function init() {
//             enableBluetooth()
//         }
//         init();

//         return () => {
//             async function stopBLEScanning() {
//                 //await stopBLE Scanning 
//             }

//             stopBLEScanning();
//         }

//     }, [])

//     const enableBluetooth = () => {
//         const state = bleManager.state()
//         if (state === 'PoweredOn') {
//             setBLEEnable(true)
//             startScanning()
//             //   this.scanAndConnect();
//             subscription.remove();
//         }
//         else if (state === 'PoweredOff') {
//             alert("Please Turn On your bluetooth.")
//         } else if (state === 'Unauthorized') {
//             alert("Your application needs Bluetooth to scan for devices, please turn on Bluetooth from App Settings.")
//         }

//         // const subscription = bleManager.onStateChange((state) => {
//         //     if (state === 'PoweredOn') {
//         //         setBLEEnable(true)
//         //         startScanning()
//         //         //   this.scanAndConnect();
//         //           subscription.remove();
//         //     }
//         //     else if (state === 'PoweredOff') {
//         //         alert("Please Turn On your bluetooth.")
//         //     } else if (state === 'Unauthorized') {
//         //         alert("Your application needs Bluetooth to scan for devices, please turn on Bluetooth from App Settings.")
//         //     }
//         // }, true);
//     }
//     const stopScanning = () => {
//         bleManager.stopDeviceScan()
//     }
//     const toogleBluetooth = value => {
//         if (value) {
//             return enableBluetooth();
//         }
//         stopScanning();
//     }
//     const startScanning = () => {
//         bleManager.startDeviceScan(null, null, (error, device) => {
//             if (error) {
//                 console.log("Error in scanning devices:", error);
//                 return
//             }
//             console.log("Detected Device Details:", device.id, device.name, device.localName);
//             if (device.localName === 'Versa Lite') {
//                 // Stop scanning as it's not necessary if you are scanning for one device.
//                 console.log("Device Found, Stopping the Scan.");
//                 console.log("Connecting to:", device.name)
//                 this.manager.stopDeviceScan();
//                 device.connect()
//                     .then((device) => {
//                         console.log("Connected...Discovering services and characteristics");
//                         return device.discoverAllServicesAndCharacteristics()
//                     })
//                     .then((device) => {
//                         console.log('Services and characteristics discovered');
//                         return this.getServicesAndCharacteristics(device)
//                     })
//                     .then((result) => {
//                         console.log(result.value)
//                         console.log("Listening....")
//                     }, (error) => {
//                         console.warn(error.message);
//                     })
//             }
//         });
//     }
//     const renderEmpty = () => <Empty text="No Bluetooth Elements" />;
//     const renderItems = ({ item }) => {
//         return <Device {...item} iconLeft={require('../containers/assets/iconLeft.png')} iconRight={require('../containers/assets/iconRight.png')} />
//     };

//     return (
//         <View>
//             {
//                 <Layout title="Scan for BLE">
//                     <Toogle value={BLEEnable} onValueChange={toogleBluetooth} />
//                     <Subtitle title="List of Devices" />
//                     <FlatList
//                         data={List}
//                         ListEmptyComponent={renderEmpty}
//                         renderItem={renderItems}
//                     />
//                 </Layout>
//             }
//         </View>


//     )
// }
// export default BluetoothList;