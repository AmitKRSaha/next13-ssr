import Home from "./index";
import renderer from 'react-test-renderer';

describe('test', () => {

    it("test",() => {
        expect(true).toBeTruthy();
    })

    it('renders correctly', () => {
        const tree = renderer
            .create(<Home page="http://www.facebook.com">Facebook</Home>)
            .toJSON();
        expect(tree).toMatchSnapshot();
    });
})