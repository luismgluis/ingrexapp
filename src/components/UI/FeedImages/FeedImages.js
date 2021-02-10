import { Layout, Text } from '@ui-kitten/components';
import React, { Component } from 'react';
import { Dimensions, FlatList, StyleSheet, View } from 'react-native';
import Utils from './../../../libs/utils/utils';
import SelectPerfil from './../SelectPerfil/SelectPerfil';
const win = Dimensions.get('window');

class FeedImages extends Component {
    constructor(props) {
        super(props)
        this.state = {
            items: [],
            itemsO: []
        }
        this.initializeData();
    }
    initializeData() {
        let actualbox = [];
        for (let index = 0; index < 200; index++) {
            const theitem = {
                key: Utils.generateKey(`Feedkey${index}`),
                name: `box${index}`
            }
            this.state.itemsO.push(theitem)
            actualbox.push(theitem)
            if (actualbox.length == 2) {
                this.state.items.push(actualbox)
                actualbox = []
                continue;
            }
        }
        if (actualbox.length > 0) {
            this.state.items.push(actualbox)
            actualbox = []
        }
    }
    renderBox(data) {
        console.log(data);
        return (
            <View key={data.key} style={styles.box}>
                <Text key={`t${data.key}`}
                    style={styles.title}>{data.name + "----"}</Text>
            </View>
        );
    }
    render() {
        const context = this;

        const renderItem = ({ item }) => {
            return context.renderBox(item);
        };
        return (
            <Layout style={styles.container}>
                <View style={styles.view1}>
                    <SelectPerfil />
                </View>
                <View style={styles.view2}>
                    <FlatList
                        contentContainerStyle={{ margin: 4 }}
                        horizontal={false}
                        numColumns={3}
                        data={this.state.itemsO}
                        renderItem={renderItem}
                        keyExtractor={item => item.key}
                    />
                </View>
            </Layout>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 12,
    },
    view1: {
        flex: 12,
        maxHeight: 50
    },
    view2: {
        flex: 12,
    },
    content: {
        flex: 12,
    },
    box: {
        backgroundColor: "cyan",
        width: (win.width / 3),
        height: (win.width / 3)
    }
})
export default FeedImages;