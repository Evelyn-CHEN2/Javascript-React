import { View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';


const IconButton = ({name, size, color}) => {
    return (
        <View>
            <Ionicons style={{marginRight: 4}} name={name} size={size} color={color}/>
        </View>
    )
};

export default IconButton;