import { Button, Icon, Layout } from '@ui-kitten/components';
import React, { Component } from 'react';
import {
    StyleSheet,
    TextInput,
    TouchableHighlight,
    View
} from 'react-native';


class CSearch extends Component {
    constructor(props) {
        super(props)
        this.state = {
            inputValue: "",
            inputEnabled: false,
            searchString: ""
        }
        this.myInput = null;

    }
    renderIconInput(icon) {
        return (props) => {
            return (
                <Icon {...props} name={icon} />
            )
        }
    }
    renderIconButton(icon, actionFn) {
        const context = this;
        const theIconLeft = (props) => {
            return (
                <Icon {...props} name={icon} />
            )
        }
        return (
            <Button
                style={styles.buttonToggle}
                status="basic"
                appearance='ghost'
                accessoryRight={theIconLeft}
                onPress={() => actionFn()}>
            </Button>
        )
    }
    setInputEnabled(yesno) {
        this.setState({
            inputEnabled: yesno
        })
        if (!yesno) {
            this.setState({
                searchString: ""
            })
        } else {
            console.log(this.myInput);
        }
    }
    onInputChange(value) {
        this.setState({
            inputValue: value
        })

    }
    render() {
        const context = this;

        return (
            <View style={styles.container}>
                {this.state.inputEnabled == true &&
                    <Layout style={styles.inputContainer} >
                        <View style={styles.inputPanel1} >
                            <TextInput
                                ref={(ev) => { context.myInput = ev }}
                                style={{ alignItems: 'center', justifyContent: 'center', backgroundColor: 'white' }}
                                value={this.state.searchString}
                                onChangeText={(searchString) => { this.onInputChange(searchString) }}
                                placeholder='Search'
                                keyboardType='web-search'

                            />
                        </View>
                        <TouchableHighlight
                            style={styles.inputPanel2}
                            underlayColor='transparent'>
                            <View>
                                {
                                    context.renderIconButton("close-outline", () => { context.setInputEnabled.call(context, false) })
                                }
                            </View>
                        </TouchableHighlight>
                    </Layout>
                }
                {this.state.inputEnabled == false &&
                    this.renderIconButton("search-outline", () => { context.setInputEnabled(true) })
                }
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 12
    },
    inputContainer: {
        flexDirection: "row"
    },
    inputPanel1: {
        flex: 12
    },
    inputPanel2: {
        alignItems: "center",
        justifyContent: "center"
    },
})
export default CSearch;