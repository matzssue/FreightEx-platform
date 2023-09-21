import { Text, View, StyleSheet } from '@react-pdf/renderer';
import { getInvoices } from 'src/utils/api/supabase/types';

const styles = StyleSheet.create({
  spaceBetween: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    color: '#3E3E3E',
    gap: 50,
  },

  titleContainer: { flexDirection: 'row', marginTop: 24 },
  dateTitle: { fontSize: 11, fontStyle: 'bold' },
  date: { fontWeight: 400, fontSize: 10, textAlign: 'center' },
});

export const InvoiceDates = ({ invoiceData }: { invoiceData: getInvoices }) => {
  return (
    <View style={styles.titleContainer}>
      <View style={styles.spaceBetween}>
        <View style={{ maxWidth: 300 }}>
          <Text style={styles.dateTitle}>Facture Date </Text>
          <Text style={styles.date}>{invoiceData.date}</Text>
        </View>
        <View style={{ maxWidth: 300 }}>
          <Text style={styles.dateTitle}>End date </Text>
          <Text style={styles.date}>{invoiceData.endDate}</Text>
        </View>
        <View style={{ maxWidth: 200 }}>
          <Text style={styles.dateTitle}>Payment term(days) </Text>
          <Text style={styles.date}>{invoiceData.paymentTerm}</Text>
        </View>
      </View>
    </View>
  );
};
