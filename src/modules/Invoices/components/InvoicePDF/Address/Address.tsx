import { StyleSheet, Text, View } from '@react-pdf/renderer';
import { GetInvoices } from 'src/utils/api/supabase/types';

const styles = StyleSheet.create({
  spaceBetween: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    color: '#3E3E3E',
  },

  titleContainer: { flexDirection: 'row', marginTop: 24 },
  addressTitle: { fontSize: 11, fontStyle: 'bold' },
  invoice: { fontWeight: 'bold', fontSize: 20 },
  invoiceNumber: { fontSize: 11, fontWeight: 'bold' },
});

export const Address = ({ invoiceData }: { invoiceData: GetInvoices }) => (
  <View style={styles.titleContainer}>
    <View style={styles.spaceBetween}>
      <View>
        <Text style={styles.invoice}>Invoice </Text>
        <Text style={styles.invoiceNumber}>Invoice number: {invoiceData.id} </Text>
      </View>
      <View>
        <Text style={styles.addressTitle}>Test street 20,</Text>
        <Text style={styles.addressTitle}>Test city, 10-100,</Text>
        <Text style={styles.addressTitle}>Test Country</Text>
      </View>
    </View>
  </View>
);
