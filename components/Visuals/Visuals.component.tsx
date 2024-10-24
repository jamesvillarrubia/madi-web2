'use client'


type VisualsMainProps = {
    selectedGraph: string;
    graphMap: Record<string, [string, React.ReactNode, React.ReactNode]>
};

const renderedGraphs = {} as Record<string, boolean>;

const VisualsMain = ({ selectedGraph, graphMap }: VisualsMainProps) => {
    renderedGraphs[selectedGraph] = true;
    return (
        <>
            {Object.keys(graphMap).map((graphType) => 
                <div key={graphType} style={{ display: (selectedGraph === graphType && renderedGraphs[graphType]) ? "block" : "none" }}>{graphMap[graphType][1]}</div>
            )}
        </>
    );
};

export default VisualsMain;