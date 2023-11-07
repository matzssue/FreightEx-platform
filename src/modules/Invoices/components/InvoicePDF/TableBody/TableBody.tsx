import { Fragment } from 'react';
import { StyleSheet, Text, View } from '@react-pdf/renderer';
import { GetAcceptedLoadsData } from 'src/utils/api/supabase/types';
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

  tbody2: { flex: 3, borderRightWidth: 1 },
});

export const TableBody = ({ loadData }: { loadData: GetAcceptedLoadsData[] }) =>
  loadData.map((item) => (
    <Fragment key={item.id}>
      <View key={item.id} style={{ width: '100%', flexDirection: 'row' }}>
        <View style={[styles.tbody, styles.tbody2]}>
          <Text>
            {item.loading_address_id.country}, {item.loading_address_id.postal_code}{' '}
            {item.loading_address_id.city}
          </Text>
        </View>
        <View style={[styles.tbody, styles.tbody2]}>
          <Text>
            {item.unloading_address_id.country}, {item.unloading_address_id.postal_code}{' '}
            {item.unloading_address_id.city}
          </Text>
        </View>
        <View style={styles.tbody}>
          <Text>
            {item.price} {item.currency}
          </Text>
        </View>
      </View>
    </Fragment>
  ));
