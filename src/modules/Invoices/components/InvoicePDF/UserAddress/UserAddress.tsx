import { Text, View, StyleSheet } from '@react-pdf/renderer';
import { UserDatabaseWithComp } from 'src/utils/api/supabase/types';

const styles = StyleSheet.create({
  spaceLeft: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    color: '#3E3E3E',
    gap: 20,
  },

  titleContainer: { flexDirection: 'row', marginTop: 24 },
  addressTitle: { fontSize: 11, fontStyle: 'bold', marginLeft: 5 },
  address: { fontWeight: 400, fontSize: 10 },
});

export const UserAddress = ({ recipientData }: { recipientData: UserDatabaseWithComp }) => (
  <View style={styles.titleContainer}>
    <View style={styles.spaceLeft}>
      <View style={{ maxWidth: 200 }}>
        <Text style={styles.addressTitle}>Bill to </Text>
        <Text style={styles.address}>{recipientData.email}</Text>
      </View>

      <Text style={styles.addressTitle}>{recipientData.company_vat_id.name}</Text>
      <Text style={styles.addressTitle}>{recipientData.name}</Text>
      <Text style={styles.addressTitle}>{recipientData.surname}</Text>
    </View>
  </View>
);
