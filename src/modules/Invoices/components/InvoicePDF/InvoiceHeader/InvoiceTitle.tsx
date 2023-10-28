import { StyleSheet, Text, View } from '@react-pdf/renderer';
const styles = StyleSheet.create({
  page: {
    fontSize: 11,
    paddingTop: 20,
    paddingLeft: 40,
    paddingRight: 40,
    lineHeight: 1.5,
    flexDirection: 'column',
  },

  spaceBetween: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    color: '#3E3E3E',
  },

  titleContainer: { flexDirection: 'row', marginTop: 24 },

  logo: { width: 90 },

  reportTitle: { fontSize: 16, textAlign: 'center' },

  addressTitle: { fontSize: 11, fontStyle: 'bold' },

  invoice: { fontWeight: 'bold', fontSize: 20 },

  invoiceNumber: { fontSize: 11, fontWeight: 'bold' },

  address: { fontWeight: 400, fontSize: 10 },

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

  theader2: { flex: 2, borderRightWidth: 0, borderBottomWidth: 1 },

  tbody: {
    fontSize: 9,
    paddingTop: 4,
    paddingLeft: 7,
    flex: 1,
    borderColor: 'whitesmoke',
    borderRightWidth: 1,
    borderBottomWidth: 1,
  },

  total: {
    fontSize: 9,
    paddingTop: 4,
    paddingLeft: 7,
    flex: 1.5,
    borderColor: 'whitesmoke',
    borderBottomWidth: 1,
  },

  tbody2: { flex: 2, borderRightWidth: 1 },
});

export const InvoiceTitle = ({ title }: { title: string }) => (
  <View style={styles.titleContainer}>
    <View style={styles.spaceBetween}>
      <Text style={styles.reportTitle}>{title}</Text>
    </View>
  </View>
);

export default InvoiceTitle;
