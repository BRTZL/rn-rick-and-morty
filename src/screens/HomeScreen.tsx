import {StackScreenProps} from '@react-navigation/stack';
import React from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {MainStackParamList} from '../navigation/Main';
import useRickAndMortyCharacters, {
  Character,
  StatusFilterType,
} from '../query/rick-and-morty';

type HomeScreenProps = StackScreenProps<MainStackParamList, 'Home'>;

export function HomeScreen({navigation}: HomeScreenProps) {
  const [statusFilter, setStatusFilter] = React.useState<StatusFilterType>();

  const {data, fetchNextPage} = useRickAndMortyCharacters({
    statusFilter,
  });

  const onClickCharacter = (character: Character) => () => {
    navigation.navigate('Details', {character});
  };

  const onClickFilter = (status?: StatusFilterType) => () => {
    setStatusFilter(status);
  };

  return (
    <View style={styles.container}>
      <View style={styles.filterRow}>
        <TouchableOpacity
          style={[
            styles.filterButton,
            statusFilter === 'alive' && styles.filterButtonActive,
          ]}
          onPress={onClickFilter('alive')}>
          <Text>Alive</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.filterButton,
            statusFilter === 'dead' && styles.filterButtonActive,
          ]}
          onPress={onClickFilter('dead')}>
          <Text>Dead</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.filterButton,
            statusFilter === 'unknown' && styles.filterButtonActive,
          ]}
          onPress={onClickFilter('unknown')}>
          <Text>Unknown</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.filterButton]}
          onPress={onClickFilter(undefined)}>
          <Text>Clear</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        style={styles.list}
        data={data?.pages.flatMap(page => page.results) ?? []}
        keyExtractor={item => item.id.toString()}
        onEndReached={() => {
          console.log('onEndReached');
          fetchNextPage();
        }}
        onEndReachedThreshold={0.5}
        renderItem={({item}) => (
          <TouchableOpacity
            style={styles.card}
            onPress={onClickCharacter(item)}>
            <Image
              source={{
                uri: item.image,
              }}
              style={styles.cardImage}
            />
            <View style={styles.cardInfo}>
              <Text style={styles.cardName}>
                {item.name}
                <Text style={styles.cardSpecies}> - {item.species}</Text>
              </Text>
              <Text style={styles.cardOrigin}>origin: {item.origin.name}</Text>
              <Text style={styles.cardLocation}>
                last seen: {item.location.name}
              </Text>
            </View>
            <View style={styles.cardStatusWrapper}>
              <Text style={styles.cardStatus}>
                {item.status === 'unknown' ? '-' : item.status}
              </Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  filterRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  filterButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    backgroundColor: '#f0f0f0',
  },
  filterButtonActive: {
    backgroundColor: 'lightblue',
  },

  list: {
    flex: 1,
  },

  card: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    position: 'relative',
  },
  cardImage: {
    width: 64,
    height: 64,
    borderRadius: 8,
  },

  cardStatusWrapper: {
    position: 'absolute',
    left: 16 + 6,
    width: 64 - 12,
    bottom: 8,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    alignItems: 'center',

    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardStatus: {
    fontSize: 14,
    fontWeight: 'semibold',
  },

  cardInfo: {
    gap: 3,
  },
  cardName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  cardOrigin: {
    fontSize: 14,
  },
  cardLocation: {
    fontSize: 14,
  },
  cardSpecies: {
    fontSize: 14,
    fontWeight: 'normal',
  },
});
