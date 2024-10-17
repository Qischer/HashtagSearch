import { TextInput, ScrollView, StyleSheet, Platform } from 'react-native';

import { ThemedView } from '@/components/ThemedView';
import { useEffect, useState } from 'react';
import { ThemedText } from '@/components/ThemedText';

type Hashtag = {
  key: number,
  name: string,
  posts: number,
}

const data: Hashtag[] = [
{key: 0, name: "Tech", posts: 100,},
{key: 1, name: "Fashion", posts: 100,},
{key: 2, name: "Politics", posts: 100,},
]

export default function HashtagSearch() {

  const [ query, setQuery ] = useState("")
  const [ searchItems, setSearchItems ] = useState<Hashtag[]>(data)

  useEffect(() => {
      
      if (query.length <= 0) {
        setSearchItems(data);
        return;
      }

      const filtered = data.filter(() => {});

      console.log(filtered, query);

      setSearchItems(filtered);
    }, [query]);

  const handleChange = (text : string) => { setQuery(text) }

  return (
    <ThemedView style={styles.tabContainer}>
      <ThemedView style={styles.searchContainer}>
        <TextInput
          style={styles.input}
          placeholder="Search..."
          value={query}
          onChangeText={handleChange}
        />
      </ThemedView>

      <ScrollView>
        {searchItems.map((item) => {return (
          <ThemedView style={styles.item}>
            <ThemedText>
              {item.name}
            </ThemedText>
            <ThemedText>
              {item.posts}
            </ThemedText>
          </ThemedView> );
        })}
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  tabContainer: {
    marginBottom: 'auto',
    paddingTop: 50,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    padding: 10,
    margin: 10,
  },
  input: {
    flex:1,
    fontSize:16,
  },

  itemList: {

  },

  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
