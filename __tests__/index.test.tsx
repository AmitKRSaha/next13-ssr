import Home from "../pages/index";
import renderer from 'react-test-renderer';

describe('test', () => {

    it("test",() => {
        expect(true).toBeTruthy();
    })

    it('renders correctly', () => {

        const props ={
            repo : {},
            photos: {}
        }

        const tree = renderer
            .create(<Home />)
            .toJSON();
        expect(tree).toMatchSnapshot();
    });
})