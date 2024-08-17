"use client";

import { WordPressBlocksProvider } from "@faustwp/blocks";
import { WordPressBlocksProviderConfig } from "@faustwp/blocks/dist/mjs/components/WordPressBlocksProvider";

function WPBlocksProvider({
  config,
  children,
}: {
  config: WordPressBlocksProviderConfig;
  children?: React.ReactNode;
}) {
  return (
    <WordPressBlocksProvider config={config}>
      {children}
    </WordPressBlocksProvider>
  );
}

export default WPBlocksProvider;
