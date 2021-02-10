const horizontalAnimation = {
    cardStyleInterpolator: ({ current, layouts }) => {
        return {
            cardStyle: {
                transform: [
                    {
                        translateX: current.progress.interpolate({
                            inputRange: [0, 1],
                            outputRange: [layouts.screen.width, 0],
                        }),
                    },
                ],
            },
        };
    },
};
const opacityAnimation = {
    cardStyleInterpolator: ({ current }) => {
        return {
            cardStyle: {
                opacity: current.progress,
            },
        }
    }
}


export default {
    horizontalAnimation,
    opacityAnimation,
}