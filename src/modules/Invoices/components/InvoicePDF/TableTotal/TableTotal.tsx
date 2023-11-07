import { StyleSheet, Text, View } from '@react-pdf/renderer';
import { GetInvoices } from 'src/utils/api/supabase/types';
const styles = StyleSheet.create({
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

export const TableTotal = ({ invoiceData }: { invoiceData: GetInvoices }) => (
  <View style={{ width: '100%', flexDirection: 'row', marginTop: 10 }}>
    <View style={styles.total}>
      <Text />
    </View>
    <View style={styles.total}>
      <Text> </Text>
    </View>
    <View style={styles.tbody}>
      <Text>Total</Text>
    </View>
    <View style={styles.tbody}>
      <Text>
        {invoiceData.cost} {invoiceData.currency}
      </Text>
    </View>
  </View>
);
