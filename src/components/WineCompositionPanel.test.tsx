import { render, screen } from "@testing-library/react";
import WineCompositionPanel from "./WineCompositionPanel";
import wineCompositionInfo from "../tests/mocks/wine-composition-info/compositionInfo.json";
import { ITabDef } from "./shared/SharedTabs";
import userEvent from "@testing-library/user-event";
import { BreakdownComposition } from "../api/types";

const compositionTab:ITabDef = {
    label: 'Year',
    value: 'year'
}

const renderComponent = (wineCompositionData: BreakdownComposition|undefined) => {
    render(<WineCompositionPanel 
        wineCompositionData={wineCompositionData}
        value={'year'}
        tab={compositionTab}
        index={'year'}
    />);
}
describe("Wine Composition Panel", () => {
  it("should display the selected tab panel and hide the rest", () => {
    renderComponent(wineCompositionInfo);
    expect(screen.getByTestId('tabpanel-year')).toBeInTheDocument();
  });

  it("should display the show more button and hide show more on click", () => {
    renderComponent(wineCompositionInfo);
    const showMoreButton = screen.getByTestId('showMore-button');
    expect(showMoreButton).toBeInTheDocument();
    //5 + 1 (for show more button)
    expect(screen.getByTestId('tabpanel-year').childNodes).toHaveLength(6);
    userEvent.click(showMoreButton);
    //should display remaining 2 compositions
    expect(screen.getByTestId('tabpanel-year').childNodes).toHaveLength(7);
    expect(showMoreButton).not.toBeInTheDocument();
  });

  it("should display appropriate message if no composition data exists", () => {
    renderComponent(undefined);
    expect(screen.getByText('Composition details cannot be found')).toBeInTheDocument();
  });
});
