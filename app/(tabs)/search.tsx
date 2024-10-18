import { TextInput, ScrollView, StyleSheet, Platform, useColorScheme, Keyboard } from 'react-native';

import { ThemedView } from '@/components/ThemedView';
import { useEffect, useState } from 'react';
import { ThemedText } from '@/components/ThemedText';

import dataJSON from '@/data.json';
import { useThemeColor } from '@/hooks/useThemeColor';
import { Ionicons } from '@expo/vector-icons';

type Hashtag = {
    _id: number,
    name: string,
    posts: number,
}

//Import dummy data generate from scripts/generate-data.js
const data: Hashtag[] = dataJSON.payload;

export default function HashtagSearch() {

    const [ query, setQuery ] = useState("")
    const [ searchItems, setSearchItems ] = useState<Hashtag[]>(data)

    useEffect(() => {
        if (query.length <= 0) {
            setSearchItems(data);
            return;
        }
        const filtered = data.filter((item) => item.name.toLowerCase().includes(query.toLowerCase()));

        setSearchItems(filtered);
    }, [query]);

    const handleChange = (text : string) => { setQuery(text) }
    const parseNumber = (n: number) => {
        if (n >= 1000) return String(Math.floor(n / 1000)) + 'k';
        if (n > 100) return String(Math.floor(n/100)*100) + '+';

        return String(n);
    }

    const themedBorder = useThemeColor({light: "#dedede", dark:"#2e2e2e"}, "background");
    const themedInputText  = useThemeColor({light: "#1f1f1f", dark:"#f0f0f0"}, "background");    

    return (
        <ThemedView style={styles.container}>

            <ThemedView style={styles.header}>
                <ThemedText 
                    type="defaultSemiBold" 
                    style={[styles.header_item, {paddingLeft: 20, color: "#afafaf"}]}
                    onPress={Keyboard.dismiss}>cancel</ThemedText>
                <ThemedText 
                    type="subtitle" 
                    style={[styles.header_item, {textAlign:'center'}]}>Hashtag</ThemedText>


                <ThemedText style={styles.header_item}></ThemedText>
            </ThemedView>

            <ThemedView
                lightColor={'#f0f0f0'}
                darkColor={'#2f2f2f'}
                style={styles.searchbar}>
                <TextInput
                    style={[styles.input, {color:themedInputText}]}
                    placeholder="Search..."
                    value={query}
                    onChangeText={handleChange}
                />
                <Ionicons size={18} name={"search"}/>
            </ThemedView>
            
            <ScrollView style={styles.itemList}>
                {searchItems.map((item) => {return (
                    <ThemedView style={[styles.item, {borderColor:themedBorder}]} key={item._id}>
                        <ThemedText type="defaultSemiBold">#{item.name}</ThemedText>
                        <ThemedText type="defaultSemiBold">{parseNumber(item.posts)} posts</ThemedText>
                    </ThemedView> );
                })}
            </ScrollView>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 'auto',
        paddingTop: 50,
    },

    searchbar: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 50,
        paddingHorizontal: 16,
        paddingVertical: 10,
        margin: 10,
    },

    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 16,
        marginBottom: 10,
    },

    header_item: {
        width: '33%',
    },

    input: {
        flex:1,
        fontSize:16,
    },

    itemList: {
        minHeight: '100%',
        paddingHorizontal: 10,
    },

    item: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 6,
        paddingVertical: 16,
        borderBottomWidth: 1,
    },
});
