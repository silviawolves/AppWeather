import {FunctionComponent, useState} from 'react';
import {View, TextInput, TextInputProps, StyleSheet} from 'react-native';

export interface SearchInputProps {
    placeholder: TextInputProps['placeholder'];
    onSubmit: (text: string) => void;
}

const Searchbar: FunctionComponent<SearchInputProps> = ({
    placeholder,
    onSubmit,
}) => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSubmitEditing = () => {
        const normalizedSearchTerm = searchTerm.trim();
        if (normalizedSearchTerm === '') return;
        onSubmit(normalizedSearchTerm);
        setSearchTerm('');
    };

    return (
        <View style={styles.inputWrapper}>
            <TextInput
                style={styles.inputSearch}
                autoCorrect={false}
                placeholder={placeholder}
                placeholderTextColor="gray"
                value={searchTerm}
                onChangeText={setSearchTerm}
                onSubmitEditing={handleSubmitEditing}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    inputWrapper: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        paddingTop: 10,
    },
    inputSearch: {
        height: 35,
        width: '50%',
        fontSize: 20,
        color: 'lightgray',
        borderBottomColor: 'lightgrey',
        borderBottomWidth: 1,
    },
});

export default Searchbar;
