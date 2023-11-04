import { View, StyleSheet, ViewProps } from 'react-native';
import { theme } from '../styles/style';

export function ListDivider({ style }: ViewProps){
  return (
    <View 
      style={[
        styles.container,
        style
      ]}
    />
  );
}

const styles = StyleSheet.create({
    container: {
        height: 1,
        width: '78%',
        alignSelf: 'flex-end',
        backgroundColor: theme.colors.secondary40,  
    }
})