"use client";

import { WordPressBlocksProvider } from "@faustwp/blocks";
import { WordPressBlocksProviderConfig } from "@faustwp/blocks/dist/mjs/components/WordPressBlocksProvider";
import { Suspense } from "react";

function WPBlocksProvider({
  config,
  children,
}: {
  config: WordPressBlocksProviderConfig;
  children?: React.ReactNode;
}) {
  return (
    <Suspense>
      <WordPressBlocksProvider config={config}>
        {children}
      </WordPressBlocksProvider>
    </Suspense>
  );
}

export default WPBlocksProvider;
