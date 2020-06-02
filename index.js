/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import React from 'react'
import {Button} from 'react-native'

export default function RandomFood() {
    return (
        <Button></Button>
    )
}
AppRegistry.registerComponent(appName, () => App);
