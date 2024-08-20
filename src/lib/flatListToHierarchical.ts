// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Item = { [key: string]: any };
type Options = {
  idKey?: "key" | string;
  parentKey?: "parentId" | string;
  childrenKey?: "children" | string;
};

const flatListToHierarchical = (
  data: Item[] = [],
  {
    idKey = "key",
    parentKey = "parentId",
    childrenKey = "children",
  }: Options = {}
): Item[] => {
  const tree: Item[] = [];
  const childrenOf: { [key: string]: Item[] } = {};

  data.forEach((item) => {
    const newItem = { ...item };
    const { [idKey]: id, [parentKey]: parentId = 0 } = newItem;
    childrenOf[id] = childrenOf[id] || [];
    newItem[childrenKey] = childrenOf[id];
    if (parentId) {
      (childrenOf[parentId] = childrenOf[parentId] || []).push(newItem);
      return;
    }

    tree.push(newItem);
  });

  return tree;
};

export default flatListToHierarchical;
