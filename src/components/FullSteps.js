import React, { useEffect, useState } from 'react';
import { View, Text, Image } from 'react-native';
import { getStationByID } from '../services/captainapi';

const FullSteps = ({ styles, fullPath }) => {

    const [updatedFullPath, setUpdatedFullPath] = useState([]);
    useEffect(() => {
        // Function to fetch and replace station IDs with station objects
        const fetchAndReplaceStations = async () => {
            const updatedPath = await Promise.all(
                fullPath.map(async (step) => {
                    const station = await getStationByID(step.station);
                    return { ...step, station }; // Replace the station ID with the station object
                })
            );
            setUpdatedFullPath(updatedPath);
        };

        fetchAndReplaceStations();
    }, [fullPath]); // Dependency array: only re-run when fullPath changes

    //const [prevRoute, setPrevRoute] = useState()

    return (<View style={[{ paddingHorizontal: 20 }, { minWidth: '80%' }, { paddingTop: 20 }]}>
        <Text style={styles.recentStyle}>DETAILED STEPS</Text>

        {updatedFullPath.map((step, index) => (


            <View key={index} style={[{ flexDirection: "row" }]}>
                <Image
                    source={require("../../assets/ic_place.png")}
                    style={{ alignSelf: "center" }}
                ></Image>
                <View style={[{ flexDirection: "column" }, { margin: 20 }, { minWidth: "80%" }]}>
                    <Text style={styles.stationStyle}>"Step {index + 1}: Go to Station: {step.station.name} "</Text>




                    {step.route && (index + 1 != updatedFullPath.length) &&
                        <Text style={styles.cityStyle}>{step.route == updatedFullPath[index + 1].route ? "Stay on Current Bus" : "Kindly Change Buses "}</Text>}


                    {step.route && (index + 1 == updatedFullPath.length) &&
                        <Text style={styles.cityStyle}>"Stay on Current Bus"</Text>}
                    {!step.route &&
                        <Text style={styles.cityStyle}>"Stay on Current Bus"</Text>}
                </View>
            </View>
        ))}
    </View>
    );



}

export default FullSteps;