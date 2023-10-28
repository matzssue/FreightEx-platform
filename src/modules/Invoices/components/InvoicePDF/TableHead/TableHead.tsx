import { StyleSheet, Text, View } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  theader: {
    marginTop: 20,
    fontSize: 10,
    fontStyle: 'bold',
    paddingTop: 4,
    paddingLeft: 7,
    flex: 1,
    height: 20,
    backgroundColor: '#DEDEDE',
    borderColor: 'whitesmoke',
    borderRightWidth: 1,
    borderBottomWidth: 1,
  },

  theader2: { flex: 3, borderRightWidth: 0, borderBottomWidth: 1 },
});

export const TableHead = () => (
  <View style={{ width: '100%', flexDirection: 'row', marginTop: 10 }}>
    <View style={[styles.theader, styles.theader2]}>
      <Text>Loading/Unloading Address</Text>
    </View>
    <View style={styles.theader}>
      <Text>Price</Text>
    </View>
  </View>
);
