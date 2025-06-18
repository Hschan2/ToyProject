import { useState } from "react";

function useFilterSelection(onFilterChange: (filter: string) => void) {
    const [loadingKey, setLoadingKey] = useState<string | null>(null);
    const [selectedKey, setSelectedKey] = useState<string | null>(null);

    
}
