"use client";

import { WordPressBlocksViewer } from "@faustwp/blocks";
import { flatListToHierarchical } from "@faustwp/core";

export function WPBlocksViewer({ blocks }) {
  const HIERARCHICAL_BLOCKS = flatListToHierarchical(blocks);

  return <WordPressBlocksViewer blocks={HIERARCHICAL_BLOCKS} />;
}
