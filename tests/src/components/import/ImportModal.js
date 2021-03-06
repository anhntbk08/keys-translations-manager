import ImportModal from '../../../../src/components/import/ImportModal'
import Modal from 'react-bootstrap/lib/Modal'

function setup() {
	ImportModal.prototype.setLocale = sinon.spy()
	ImportModal.prototype.setProject = sinon.spy()

	const props = {
			showimportmodal: true,
			closeImportModal: sinon.spy(),
			errors: [],
			importLocale: sinon.spy(),
			alertErrors: sinon.spy(),
			clearErrors: sinon.spy()
		},
		context = {
			config: config
		},
		wrapper = shallow(
			<ImportModal {...props}/>,
			{context: context}
		);

	return {
		props,
		context,
		wrapper
	}
}

describe('(component) ImportModal', () => {
	it('should render as a <Modal>', () => {
		const { wrapper } = setup()
		expect(wrapper.type()).to.eql(Modal);
	});

	it('should contain <AlertPanel>', () => {
		const { wrapper } = setup()
		expect(wrapper.find('AlertPanel')).to.have.length(1);
	});

	it('should contain <Dropzone>', () => {
		const { wrapper } = setup()
		expect(wrapper.find('Dropzone')).to.have.length(1);
	});

	it('should have 2 radio groups', () => {
		const { wrapper } = setup()
		expect(wrapper.find('.app-radio-group')).to.have.length(2);
	});

	it('should contain a Confirm button with "primary" class', () => {
		const { wrapper } = setup()
		expect(wrapper.find('Button').first().props().bsStyle).to.eql('primary');
	});

	it('should contain a Dismiss button with "default" class', () => {
		const { wrapper } = setup()
		expect(wrapper.find('Button').last().props().bsStyle).to.eql('default');
	});

	describe('child: "locale" radioGroup', () => {
		it('should call setLocale() if the selected changed', () => {
			const { props, wrapper } = setup()
			wrapper.find('Radio[name="locale"]').first().simulate('change');
			expect(ImportModal.prototype.setLocale).calledOnce;
		});
	});

	describe('child: "project" radioGroup', () => {
		it('should call setProject() if the selected changed', () => {
			const { props, wrapper } = setup()
			wrapper.find('Radio[name="project"]').last().simulate('change');
			expect(ImportModal.prototype.setProject).calledOnce;
		});
	});

	describe('child: confirm button', () => {
		it('should call either alertErrors() or importLocale() if clicked', () => {
			const { props, wrapper } = setup()
			wrapper.find('Button').first().simulate('click');
			expect(props.alertErrors).calledOnce;

			wrapper.setState({
				selectedFile: {},
				selectedLocale: "en_US",
				selectedProject: "p1"
			});
			wrapper.find('Button').first().simulate('click');
			expect(props.importLocale).calledOnce;
		});
	});

	describe('child: dismiss button', () => {
		it('should call props.closeImportModal() if clicked', () => {
			const { props, wrapper } = setup()
			wrapper.find('Button').last().simulate('click');
			expect(props.closeImportModal).calledOnce;
		});
	});
});
