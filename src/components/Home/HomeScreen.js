import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BottomNavigation, BottomNavigationTab, Icon } from '@ui-kitten/components';
import React from 'react';
import PerfilScreen from '../Perfil/PerfilScreen';

const { Navigator, Screen } = createBottomTabNavigator();

const StarIcon = (props) => (
    <Icon {...props} name='star' />
);

const BottomTabBar = ({ navigation, state }) => (
    <BottomNavigation
        selectedIndex={state.index}
        onSelect={index => navigation.navigate(state.routeNames[index])}>
        <BottomNavigationTab title='USERS' icon={StarIcon} />
        <BottomNavigationTab title='ORDERS' icon={StarIcon} />
    </BottomNavigation>
);
const TabNavigator = () => (
    <Navigator tabBar={props => <BottomTabBar {...props} />}>
        <Screen name='Users' component={PerfilScreen} />
        <Screen name='Orders' component={PerfilScreen} />
    </Navigator>
);

const HomeScreen = () => {
    return (
        <>
            <TabNavigator />
        </>
    );
};
export default HomeScreen;