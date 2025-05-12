import { Text, View } from 'react-native';
import { useSelector } from 'react-redux';

const CustomHeader = ({title, name}) => {
    const loggedUser = useSelector (state => state.user.loggedUser)
    return (
        <View style={{ 
            flex: 1,
            width: '100%', 
            flexDirection: 'row', 
            alignItems: 'center', 
            justifyContent: 'space-between',
            paddingHorizontal: 10,
            }}>
                <View style={{ width: 30 }} />
            <View style={{ flex:1, alignItems: 'flex-end' }}>
            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{title}</Text>
            </View>
            <View style={{ width: 140, alignItems: 'flex-end' }}>
            {loggedUser && (
                <Text style={{fontSize: 10}}>Hi, {loggedUser?.name} !</Text>
            )}
            </View>
        </View>
    );
}

export default CustomHeader;