import {StackScreenProps} from '@react-navigation/stack';
import React from 'react';
import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import {MainStackParamList} from '../navigation/Main';

type DetailsScreenProps = StackScreenProps<MainStackParamList, 'Details'>;

export function DetailsScreen({
  navigation,
  route: {
    params: {character},
  },
}: DetailsScreenProps) {
  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: character.name,
    });
  }, [navigation, character]);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.imageWrapper}>
        <Image source={{uri: character.image}} style={styles.image} />
      </View>

      <View style={styles.tile}>
        <Text style={styles.label}>Location</Text>
        <Text style={styles.field}>{character.location.name || '-'}</Text>
      </View>

      <View style={styles.oddTile}>
        <Text style={styles.label}>Origin</Text>
        <Text style={styles.field}>{character.origin.name || '-'}</Text>
      </View>

      <View style={styles.tile}>
        <Text style={styles.label}>Species</Text>
        <Text style={styles.field}>{character.species || '-'}</Text>
      </View>

      <View style={styles.oddTile}>
        <Text style={styles.label}>Status</Text>
        <Text style={styles.field}>{character.status || '-'}</Text>
      </View>

      <View style={styles.tile}>
        <Text style={styles.label}>Type</Text>
        <Text style={styles.field}>{character.type || '-'}</Text>
      </View>

      <View style={styles.oddTile}>
        <Text style={styles.label}>Gender</Text>
        <Text style={styles.field}>{character.gender || '-'}</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    gap: 6,
    paddingBottom: 36,
  },

  imageWrapper: {
    padding: 12,
  },
  image: {
    width: '100%',
    aspectRatio: 1,
    marginBottom: 12,
    borderRadius: 12,
  },

  tile: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: '#fdfdfd',
    gap: 6,
  },
  oddTile: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: '#f0f0f0',
    gap: 6,
  },

  label: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  field: {
    fontSize: 18,
    color: 'gray',
  },
});
