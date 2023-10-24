import { StyleSheet, FlatList } from "react-native";
import { ICategoriesProps, categories } from "../utils/categories";
import { Category } from "./category";

type Props = {
    categorySelect?: ICategoriesProps,
    hasCheckBox?: boolean,
    dynamicPress: (category: ICategoriesProps) => void;
};

export function CategorySelect({ categorySelect, hasCheckBox = false, dynamicPress }: Props) {

    function setActive(item: ICategoriesProps): boolean {
        return (categorySelect?.id === item.id);
    };

    return (
        <FlatList
            showsHorizontalScrollIndicator={false}
            data={categories}
            horizontal
            keyExtractor={(item) => item.id}
            renderItem={({ item, index }) => (
                <Category style={index < categories.length - 1 ? { marginRight: 5 } : null} onPress={() => dynamicPress(item)} key={item.id} icon={item.icon} title={item.title} checked={setActive(item)} hasCheckBox={hasCheckBox} />
            )}
        />
    )
};

const styles = StyleSheet.create({

});