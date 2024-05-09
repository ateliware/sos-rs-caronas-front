import { ReactNode, useEffect, useRef, useState } from 'react';
import {
  Accordion,
  Button,
  Chart,
  Checkbox,
  Chip,
  ChipGroup,
  ColorPickerInput,
  CustomTooltip,
  DataLoader,
  DatePickerInput,
  Drawer,
  FileUpload,
  FileUploadImgCrop,
  Icon,
  Input,
  InputAddon,
  InputIcon,
  InputTextArea,
  Map,
  Modal,
  PopOver,
  PopOverMenu,
  RadioButton,
  RadioForm,
  Select,
  Spinner,
  Switch,
  Tab,
  Table,
  TableColumn,
} from '@components';
import { SelectedKeys } from '@components/Table';
import sampleImage from '@assets/sample.jpg';
import { useModal } from '@hooks';
import { convertXlsToJSON, readFile } from '@services/io/file';
import { useForm } from 'react-hook-form';
import { dataChart } from './dataChart';
import { PageHeader } from '@components/PageHeader';
import { formDatePattern } from '@validations/date';
import { formColorPattern } from '@validations/color';

function tableExampleData1() {
  return [
    { name: 'John', age: 20, status: 'inactive' },
    { name: 'Jane', age: 21, status: 'active' },
    { name: 'Jack', age: 22, status: <Switch /> },
  ];
}

function tableExampleData2() {
  return [
    {
      costCenter: 'Cost Center 1',
      department: 'Department 1',
      budget: 1000,
      q2: 500,
      q3: 700,
      q4: 900,
      fulfilled: 800,
      percentage: -20,
    },
    {
      costCenter: 'Cost Center 2',
      department: 'Department 2',
      budget: 2000,
      q2: 1500,
      q3: 1800,
      q4: 2100,
      fulfilled: 1900,
      percentage: 10,
    },
    {
      costCenter: 'Cost Center 3',
      department: 'Department 3',
      budget: 3000,
      q2: 2500,
      q3: 2800,
      q4: 3200,
      fulfilled: 3100,
      percentage: 5,
    },
    {
      costCenter: 'Cost Center 4',
      department: 'Department 4',
      budget: 4000,
      q2: 3800,
      q3: 4100,
      q4: 4400,
      fulfilled: 4200,
      percentage: 8,
    },
    {
      costCenter: 'Cost Center 5',
      department: 'Department 5',
      budget: 5000,
      q2: 4800,
      q3: 5200,
      q4: 5500,
      fulfilled: 5300,
      percentage: 6,
    },
    {
      costCenter: 'Cost Center 6',
      department: 'Department 6',
      budget: 6000,
      q2: 6200,
      q3: 6400,
      q4: 6700,
      fulfilled: 6500,
      percentage: -4,
    },
    {
      costCenter: 'Cost Center 7',
      department: 'Department 7',
      budget: 7000,
      q2: 7300,
      q3: 7500,
      q4: 7800,
      fulfilled: 7600,
      percentage: 9,
    },
    {
      costCenter: 'Cost Center 8',
      department: 'Department 8',
      budget: 8000,
      q2: 8200,
      q3: 8500,
      q4: 8800,
      fulfilled: 8700,
      percentage: 3,
    },
    {
      costCenter: 'Cost Center 9',
      department: 'Department 9',
      budget: 9000,
      q2: 9200,
      q3: 9500,
      q4: 9800,
      fulfilled: 9600,
      percentage: 2,
    },
    {
      costCenter: 'Cost Center 10',
      department: 'Department 10',
      budget: 10000,
      q2: 10200,
      q3: 10500,
      q4: 10800,
      fulfilled: 10600,
      percentage: -1,
    },
  ];
}

export default function Aquario() {
  const {
    watch: drawerOpen,
    setValue: setDrawerOpen,
    register: controlDrawer,
  } = useForm();

  const { isOpen: isOpenA, toggle: toggleA } = useModal();
  const { isOpen: isOpenB, toggle: toggleB } = useModal();
  const [fileContent, setFileContent] = useState('');
  const [fileName, setFileName] = useState('');

  const [selectedKeys, setSelectedKeys] = useState<SelectedKeys>({});
  const [invertSelection, setInvertSelection] = useState(false);
  const [loading, setLoading] = useState(true);
  const [loadSpinner, setLoadSpinner] = useState(true);
  const [data, setData] = useState<string[]>([]);

  const [monthChips, setMonthChips] = useState([
    { key: 'january', text: 'Jan', active: true, disabled: true },
    { key: 'february', text: 'Fev', active: false, disabled: true },
    { key: 'march', text: 'Mar', active: false, disabled: true },
    { key: 'april', text: 'Abr', active: false, disabled: false },
    { key: 'may', text: 'Mai', active: false, disabled: false },
    { key: 'june', text: 'Jun', active: true, disabled: false },
    { key: 'july', text: 'Jul', active: false, disabled: false },
    { key: 'august', text: 'Ago', active: false, disabled: false },
    { key: 'september', text: 'Set', active: true, disabled: false },
    { key: 'october', text: 'Out', active: false, disabled: false },
    { key: 'november', text: 'Nov', active: false, disabled: false },
    { key: 'december', text: 'Dez', active: true, disabled: false },
  ]);

  const handleChipClick = (index: number) => {
    setMonthChips((prevMonthChips) => {
      return prevMonthChips.map((monthChip, monthChipIndex) => {
        if (monthChipIndex !== index) return monthChip;

        return {
          ...monthChip,
          active: !monthChip.active,
        };
      });
    });
  };

  const accordionTableData = [
    {
      budget: 10000,
      donee: 8000,
      percentage: -20,
    },
  ];

  useEffect(() => {
    setTimeout(() => {
      const apiData = ['Item 1 ', 'Item 2 ', 'Item 3 '];
      setData(apiData);
      setLoadSpinner(false);
    }, 1000);

    setTimeout(() => {
      setLoading(false);
    }, 10000);
  });

  const {
    watch,
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const chart1Ref = useRef<HTMLDivElement>(null);
  const chart2Ref = useRef<HTMLDivElement>(null);

  const handleScroll = (event: React.UIEvent<HTMLDivElement>) => {
    const { scrollLeft } = event.currentTarget;

    switch (event.currentTarget) {
      case chart1Ref.current:
        chart2Ref.current!.scrollLeft = scrollLeft;
        break;

      case chart2Ref.current:
        chart1Ref.current!.scrollLeft = scrollLeft;
        break;

      default:
        break;
    }
  };

  const fewBars = [
    {
      name: 'Page A',
      barKey: '1',
      uv: 400,
      pv: 240,
      amt: 52,
    },
    {
      name: 'Page B',
      barKey: '2',
      uv: 300,
      pv: 139,
      amt: 90,
    },
    {
      name: 'Page C',
      barKey: '3',
      uv: 200,
      pv: 380,
      amt: 45,
    },
  ];

  return (
    <>
      {loadSpinner ? (
        <div className="mt-s-500">
          <Spinner />
        </div>
      ) : (
        <div className="mt-s-300 container">
          <PageHeader
            title="Home"
            backButton
            actions={
              <>
                <Button
                  color="negative"
                  className="ml-s-100"
                  onClick={() => toggleA()}
                >
                  Form Modal
                </Button>
              </>
            }
          />
          <Modal
            isOpen={isOpenA}
            onClickAway={toggleA}
            size="large"
            title="Cadastrar budget"
          >
            <div className="d-flex row mb-s-200">
              <div className="col-sm-6">
                <Select
                  label="Categoria"
                  value={watch('option')}
                  error={!!errors.option}
                  caption={errors.option?.message as string}
                  placeholder="Selecione uma categoria"
                  form={register('option', { required: 'required' })}
                  onSelect={(value: string) => {
                    setValue('option', value);
                  }}
                  options={[
                    { label: 'Option 1', value: 'option 1' },
                    { label: 'Option 2', value: 'option 2' },
                  ]}
                />
              </div>
              <div className="col-sm-6 ml-s-200">
                <Input
                  label="Descrição"
                  placeholder="Selecione uma categoria"
                ></Input>
              </div>
            </div>
            <div className="d-flex row mb-s-200">
              <div className="col-sm-6">
                <Input label="Observação" placeholder="-"></Input>
              </div>
              <div className="col-sm-6 ml-s-200">
                <Input
                  label="Cliente/fornecedor"
                  placeholder="Digite um fornecedor"
                ></Input>
              </div>
            </div>
            <div className="d-flex row mb-s-200">
              <div className="col-sm-6">
                <Input label="Valor à pagar" placeholder="R$"></Input>
              </div>
              <div className="col-sm-6 ml-s-200">
                <Input
                  label="Centro de custo"
                  placeholder="SobMedida/Design"
                ></Input>
              </div>
            </div>
            <div className="d-flex row mb-s-200">
              <div className="col-sm-6">
                <Select
                  label="Modelo de budget"
                  value={watch('option')}
                  error={!!errors.option}
                  caption={errors.option?.message as string}
                  placeholder="Selecione o modelo de budget"
                  form={register('option', { required: 'required' })}
                  onSelect={(value: string) => {
                    setValue('option', value);
                  }}
                  options={[
                    { label: 'Option 1', value: 'option 1' },
                    { label: 'Option 2', value: 'option 2' },
                  ]}
                />
              </div>
            </div>
            <label className="form-input__label">Mês</label>
            <div className="d-flex row mb-s-200">
              <ChipGroup
                chips={monthChips}
                onChipClick={handleChipClick}
                sizeChips="small"
              />
            </div>
            <div className="d-flex row" style={{ minHeight: '232px' }} />
            <div className="d-flex justify-end">
              <Button className="pl-s-900 pr-s-900">Salvar</Button>
            </div>
          </Modal>
          <Modal isOpen={isOpenB} onClickAway={toggleB}>
            <div>B</div>
          </Modal>
          <div className="d-flex">
            <div className="gap">
              <h2>Inputs</h2>
              <Input
                label="Email"
                caption="Nice email!"
                prefixes={<InputAddon left>email here!</InputAddon>}
                suffixes={<InputAddon right>@gmail.com</InputAddon>}
                placeholder="username"
              ></Input>
              <Button
                color="negative"
                className="ml-s-100"
                size="small"
                onClick={() => alert('hi')}
              >
                Print hi
              </Button>
              <Input
                size="small"
                label="Small username"
                caption="Nice username!"
                prefixes={
                  <>
                    <InputAddon left>
                      <InputIcon>person</InputIcon>
                    </InputAddon>
                    <InputAddon center>user:</InputAddon>
                  </>
                }
                placeholder="username"
              ></Input>
              <Input
                size="large"
                prefixes={<InputAddon left>can't type</InputAddon>}
                label="Large disabled input"
                disabled
              ></Input>
              <Input
                prefixes={
                  <InputAddon left>
                    <InputIcon>close</InputIcon>
                  </InputAddon>
                }
                label="Error input"
                caption="Error input is invalid"
                error
              ></Input>
              <h2>Checkbox</h2>
              <Checkbox label="Default checkbox" />
              <Checkbox label="Selected checkbox" />
              <Checkbox indeterminate label="Indeterminate checkbox" />
              <Checkbox disabled label="Default checkbox disabled" />
              <h2>Radio</h2>
              <RadioForm
                name="radioForm"
                form={register('example', { value: 'value 3' })}
              >
                <RadioButton
                  label="Enabled default unchecked"
                  value="value 1"
                />
                <RadioButton label="Enabled default checked" value="value 2" />
                <RadioButton
                  label="Disabled default checked"
                  value="value 3"
                  disabled
                />
              </RadioForm>

              <h2>Switch</h2>
              <Switch label="Default switch" name="switchExample" />
              <Switch label="Checked switch" name="switchExample" />
              <Switch
                label="Default switch disabled"
                disabled
                name="switchExample2"
              />
              <Switch
                label="Checked switch disabled"
                disabled
                name="switchExample2"
              />
              <h2>Drawers</h2>
              <Drawer
                closable
                float="left"
                size="md"
                open={drawerOpen('1')}
                onClickAway={() => setDrawerOpen('1', false)}
              >
                Hi
              </Drawer>
              <Checkbox
                form={controlDrawer('1')}
                label="Open closable drawer (+overlay)"
              />
              <Drawer
                className="bg-secondary"
                overlay={false}
                open={drawerOpen('2')}
                onClickAway={() => setDrawerOpen('2', false)}
              >
                Content
              </Drawer>
              <Checkbox
                form={controlDrawer('2')}
                label="Open unclosable drawer"
              />
              <h2>Chips</h2>
              <div className="d-flex">
                <Chip className="ml-s-100">Text</Chip>
                <Chip className="ml-s-100" suffixes={<Icon>close</Icon>}>
                  Text
                </Chip>
                <Chip className="ml-s-100" outlined>
                  Text
                </Chip>
                <Chip
                  className="ml-s-100"
                  outlined
                  suffixes={<Icon>close</Icon>}
                >
                  Text
                </Chip>
                <Chip color="secondary" className="ml-s-100" outlined>
                  Text
                </Chip>
                <Chip
                  color="secondary"
                  className="ml-s-100"
                  outlined
                  prefixes={<Icon>person</Icon>}
                >
                  Text
                </Chip>
              </div>
              <div className="d-flex mt-s-100">
                <Chip color="tertiary" size="small" className="ml-s-100">
                  Text
                </Chip>
                <Chip
                  color="tertiary"
                  size="small"
                  outlined
                  className="ml-s-100"
                >
                  Text
                </Chip>
                <Chip color="tertiary" size="medium" className="ml-s-100">
                  Text
                </Chip>
                <Chip color="tertiary" className="ml-s-100">
                  Text
                </Chip>
                <Chip disabled color="primary" className="ml-s-100">
                  Text
                </Chip>
                <Chip disabled color="primary" outlined className="ml-s-100">
                  Text
                </Chip>
                <Chip
                  onClick={() => alert('alert')}
                  color="alert"
                  className="ml-s-100"
                >
                  Text
                </Chip>
                <Chip
                  href="#hi"
                  target="_self"
                  color="alert"
                  className="ml-s-100"
                >
                  Text
                </Chip>
              </div>
              <h2>Buttons</h2>
              <div className="d-flex mb-s-100">
                <Button className="ml-s-100" size="small" onClick={toggleA}>
                  Modal opener A
                </Button>
                <Button className="ml-s-100" onClick={toggleB}>
                  Modal opener B
                </Button>
                <Button className="ml-s-100" size="large">
                  Button
                </Button>
                <Button className="ml-s-100" disabled>
                  Button
                </Button>
                <Button className="ml-s-100" design="transparent">
                  Button
                </Button>
                <Button className="ml-s-100" design="outlined">
                  Button
                </Button>
                <Button
                  className="ml-s-100"
                  prefixes={<Icon>close</Icon>}
                  suffixes={<Icon>close</Icon>}
                  design="filled"
                >
                  Button
                </Button>
              </div>
              <div className="d-flex mb-s-100">
                <Button color="secondary" className="ml-s-100" size="small">
                  Button
                </Button>
                <Button color="positive" className="ml-s-100">
                  Button
                </Button>
                <Button color="secondary" className="ml-s-100" size="large">
                  Button
                </Button>
                <Button color="secondary" className="ml-s-100" disabled>
                  Button
                </Button>
                <Button
                  color="secondary"
                  className="ml-s-100"
                  design="transparent"
                >
                  Button
                </Button>
                <Button
                  color="secondary"
                  className="ml-s-100"
                  design="outlined"
                >
                  Button
                </Button>
                <Button
                  color="secondary"
                  className="ml-s-100"
                  prefixes={<Icon>close</Icon>}
                  suffixes={<Icon>close</Icon>}
                  design="filled"
                >
                  Button
                </Button>
              </div>
              <div className="d-flex mb-s-100">
                <Button color="tertiary" className="ml-s-100" size="small">
                  Button
                </Button>
                <Button color="tertiary" className="ml-s-100">
                  Button
                </Button>
                <Button color="tertiary" className="ml-s-100" size="large">
                  Button
                </Button>
                <Button color="tertiary" className="ml-s-100" disabled>
                  Button
                </Button>
                <Button
                  color="tertiary"
                  className="ml-s-100"
                  design="transparent"
                >
                  Button
                </Button>
                <Button color="tertiary" className="ml-s-100" design="outlined">
                  Button
                </Button>
                <Button
                  color="tertiary"
                  className="ml-s-100"
                  prefixes={<Icon>close</Icon>}
                  suffixes={<Icon>close</Icon>}
                  design="filled"
                >
                  Button
                </Button>
              </div>
              <div className="d-flex mb-s-100">
                <Button color="negative" className="ml-s-100" size="small">
                  Button
                </Button>
                <Button color="alert" className="ml-s-100">
                  Button
                </Button>
                <Button color="positive" className="ml-s-100" size="large">
                  Button
                </Button>
                <Button color="neutral" className="ml-s-100" disabled>
                  Button
                </Button>
                <Button
                  color="negative"
                  className="ml-s-100"
                  design="transparent"
                >
                  Button
                </Button>
                <Button color="positive" className="ml-s-100" design="outlined">
                  Button
                </Button>
                <Button
                  color="alert"
                  className="ml-s-100"
                  prefixes={<Icon>close</Icon>}
                  suffixes={<Icon>close</Icon>}
                  design="filled"
                >
                  Button
                </Button>
              </div>
              <h2>File Upload</h2>
              <div>
                <div className="row mb-s-200">
                  <div className="col-sm-2">
                    <FileUpload hideLabel />
                  </div>
                  <div className="col-sm-2 ml-s-200">
                    <FileUpload
                      fileName="sample.jpg"
                      image={sampleImage}
                      hideLabel
                      uploadPreview
                    />
                  </div>
                  <div className="col-sm-6 ml-s-200">
                    <FileUpload uploadPreview />
                  </div>
                </div>
                <h3>Arquivos XLS/XLSX</h3>
                <div className="row mb-s-200">
                  <FileUpload
                    accept=".xls, .xlsx"
                    onChange={([file]) => {
                      if (file) {
                        setFileName(file.name);
                        readFile(file).then((content) =>
                          setFileContent(content)
                        );
                        convertXlsToJSON(file);
                      }
                    }}
                  />
                </div>
                <div className="row mb-s-200">
                  <div className="col-sm-6">
                    <p>File Name: {fileName}</p>
                    <span>
                      File Content:{' '}
                      <pre className="bg-neutral text-neutral-90 p-s-200">
                        {fileContent}
                      </pre>
                    </span>
                  </div>
                </div>
              </div>
              <h2>Table</h2>
              <Table
                checkable
                hoverable
                onAction={() => alert('bulk action')}
                data={tableExampleData1()}
                dataKey="name"
                onSelectionChange={(selectedKeys, invertSelection) => {
                  setSelectedKeys(selectedKeys);
                  setInvertSelection(invertSelection);
                }}
              >
                <TableColumn
                  fromKey="name"
                  header="Account"
                  container={true}
                  render={(name) => (
                    <>
                      <div className="mr-s-200">
                        <span className="table__cell__icon material-symbols-outlined">
                          account_circle
                        </span>
                      </div>
                      <div>
                        <p className="table__cell__title">{name}</p>
                        <p className="table__cell__subtitle">{name}</p>
                      </div>
                    </>
                  )}
                />
                <TableColumn
                  fromKey="name"
                  header="Name"
                  onAction={(column) => alert(`action ${column}`)}
                />
                <TableColumn fromKey="age" header="Age" />
                <TableColumn
                  fromKey="status"
                  header="Status"
                  filters={(column: any) => alert(`filter ${column}`)}
                  onAction={(column: any) => alert(`action ${column}`)}
                  render={(status: ReactNode) => {
                    const statusColor =
                      status === 'active' ? 'positive' : 'negative';
                    return (
                      <Chip
                        color="transparent"
                        prefixes={
                          <Icon className={`text-${statusColor}`}>circle</Icon>
                        }
                      >
                        {status === 'active'}
                        <strong className={`text-${statusColor}`}>
                          {status}
                        </strong>
                      </Chip>
                    );
                  }}
                />
                <TableColumn
                  width="6%"
                  fromKey="id"
                  header="Action"
                  disableSorting
                  render={(id) => {
                    return (
                      <PopOver
                        fixedContent={<Icon>more_horiz</Icon>}
                        togglableContent={
                          <PopOverMenu
                            menu={[
                              {
                                onClick: () => {
                                  alert('Deleted' + id);
                                },
                                content: 'Delete',
                                show: true,
                              },
                            ]}
                          />
                        }
                      />
                    );
                  }}
                />
              </Table>
              <p className="mt-s-200 mb-s-200">
                <strong>Selected keys: </strong>
                {invertSelection && 'everyone except: '}
                {Object.keys(selectedKeys).join(', ')}
              </p>
              <h2>Forms</h2>
              <form onSubmit={handleSubmit((data) => console.log(data))}>
                <Input
                  label="Username"
                  error={!!errors.username}
                  caption={errors.username?.message as string}
                  form={register('username', {
                    required: 'Username is required',
                  })}
                />

                <DatePickerInput
                  label="Date"
                  dateSelected={watch('datepicker')}
                  error={!!errors.datepicker}
                  caption={errors.datepicker?.message as string}
                  form={register('datepicker', {
                    required: 'required',
                    ...formDatePattern,
                  })}
                  onSelect={(date: String) => {
                    setValue('datepicker', date);
                  }}
                />
                <ColorPickerInput
                  label="Color"
                  colorSelected={watch('colorpicker')}
                  error={!!errors.colorpicker}
                  caption={errors.colorpicker?.message as string}
                  form={register('colorpicker', {
                    required: 'required',
                    ...formColorPattern,
                  })}
                  onSelect={(color: String) => {
                    setValue('colorpicker', color);
                  }}
                />

                <div className="col-md-12 mb-m-100">
                  <InputTextArea
                    emojiPicker
                    error={!!errors.answer}
                    caption={errors.answer?.message as string}
                    label="Answer"
                    placeholder="Answer"
                    form={register('answer', { required: 'Required' })}
                    onEmojiClick={(emoji) => {
                      setValue('answer', watch('answer') + emoji);
                    }}
                  />
                </div>

                <Input
                  label="Message"
                  disabled
                  error={!!errors.message}
                  caption={errors.message?.message as string}
                  form={register('message', {
                    required: 'Message is required',
                  })}
                />

                <Select
                  label="Select option"
                  value={watch('option')}
                  error={!!errors.option}
                  caption={errors.option?.message as string}
                  placeholder="Select an option"
                  form={register('option', { required: 'required' })}
                  onSelect={(value: string) => {
                    setValue('option', value);
                  }}
                  options={[
                    { label: 'Option 1', value: 'option 1' },
                    { label: 'Option 2', value: 'option 2' },
                  ]}
                />

                <Checkbox
                  label="I agree to the terms and conditions"
                  error={errors.agree?.message as string}
                  form={register('agree', { required: 'You must agree' })}
                />

                <Switch
                  label="Switch it on to continue"
                  error={errors.continue?.message as string}
                  form={register('continue', {
                    required: 'You must switch it on',
                  })}
                />

                <RadioForm
                  name="radioForm"
                  error={errors.radio?.message as string}
                  form={register('radio', {
                    value: 'value 3',
                    validate: (value) =>
                      value !== 'value 2' || 'Select another option!',
                  })}
                >
                  <RadioButton
                    label="Enabled default unchecked"
                    value="value 1"
                  />
                  <RadioButton label="Dont select this one" value="value 2" />
                  <RadioButton
                    label="Disabled default checked"
                    value="value 3"
                    disabled
                  />
                </RadioForm>

                <div className="mt-s-200 mb-s-200 col-sm-3">
                  <FileUpload
                    uploadPreview
                    hideLabel
                    error={errors.files?.message as string}
                    fileName={watch('files')?.name}
                    onChange={([file]) => {
                      setValue('files', file, { shouldValidate: true });
                    }}
                    form={register('files', { required: 'File is required' })}
                  />
                  <div className="mt-s-200 mb-s-200">
                    <h3>FileUpload ImageCrop</h3>
                    <FileUploadImgCrop
                      uploadPreview
                      hideLabel
                      error={errors.files?.message as string}
                      fileName={watch('files')?.name}
                      onChange={([file]) => {
                        setValue('files', file, { shouldValidate: true });
                      }}
                      form={register('files', {
                        required: 'File is required',
                      })}
                    />
                  </div>
                </div>

                <Button className="float-right mb-s-200" type="submit">
                  Submit
                </Button>
              </form>
            </div>
          </div>
          <div className="mt-s-300">
            <h2>Data Loader</h2>
            <DataLoader data={data} isLoading={loading} />
          </div>
          <div className="mt-s-300">
            <h2>TAB Component - Example</h2>
            <Tab
              tabSelected={0}
              tabs={[
                {
                  icon: 'mfg_nest_yale_lock',
                  title: 'Test TAB component 1',
                  component: <div className="row">Tab 1</div>,
                },
                {
                  title: 'Test TAB component 2',
                  component: <div className="row">Tab 2</div>,
                },
                {
                  title: 'Test TAB component 3',
                  component: <div className="row">Tab 3</div>,
                },
              ]}
            />
          </div>
          <h2>Map</h2>
          <Map
            value={{
              lat: watch('latitude', -25.443581519654696),
              lng: watch('longitude', -49.27898590300913),
            }}
            onChange={(value) => {
              setValue('latitude', value.lat);
              setValue('longitude', value.lng);
            }}
          />
          <h2>Tabela</h2>
          <Table data={tableExampleData2()} dataKey="costCenter">
            <TableColumn fromKey="costCenter" header="Cost Center" />
            <TableColumn fromKey="department" header="Department" />
            <TableColumn fromKey="budget" header="Budget" />
            <TableColumn fromKey="q2" header="Q2" />
            <TableColumn fromKey="q3" header="Q3" />
            <TableColumn fromKey="q4" header="Q4" />
            <TableColumn fromKey="fulfilled" header="Done" />
            <TableColumn
              fromKey="percentage"
              header="Percentage"
              render={(percentage) => (
                <>
                  {percentage > 0 ? (
                    <div className="text-negative font-s-14px font-weight-bold">
                      <Icon className="arrow-up-line" />
                      {percentage.toLocaleString()}%
                    </div>
                  ) : percentage < 0 ? (
                    <div className="text-positive font-s-14px font-weight-bold">
                      <Icon className="arrow-down-line" />
                      {Math.abs(percentage).toLocaleString()}%
                    </div>
                  ) : (
                    <div className="font-weight-bold font-s-14px text-neutral-40">
                      {percentage.toLocaleString()}%
                    </div>
                  )}
                </>
              )}
            />
          </Table>
          <h2>Accordion Example</h2>
          <Accordion title="Janeiro">
            <Table data={accordionTableData}>
              <TableColumn fromKey="budget" header="Budget" />
              <TableColumn fromKey="done" header="Done" />
              <TableColumn
                fromKey="percentage"
                width="10%"
                header="Percentage"
                render={(percentage) => (
                  <>
                    {percentage > 0 ? (
                      <div className="text-negative font-s-14px font-weight-bold">
                        <Icon className="arrow-up-line" />{' '}
                        {percentage.toLocaleString()}%
                      </div>
                    ) : percentage < 0 ? (
                      <div className="text-positive font-s-14px font-weight-bold">
                        <Icon className="arrow-down-line" />{' '}
                        {Math.abs(percentage).toLocaleString()}%
                      </div>
                    ) : (
                      <div className="font-weight-bold font-s-14px text-neutral-40">
                        {percentage.toLocaleString()}%
                      </div>
                    )}
                  </>
                )}
              />
            </Table>
          </Accordion>

          <Accordion title="Test Title">
            <p>{'Test content'}</p>
          </Accordion>

          <div className="mt-s-200">
            <ChipGroup chips={monthChips} onChipClick={handleChipClick} />
          </div>
          <h2>Chart</h2>
          <div style={{ maxWidth: '1400px' }}>
            <div className="mt-s-300">
              <Chart
                title="Exemple A"
                chartId="IdGraficoA"
                toggle={true}
                scrollDivRef={chart1Ref}
                onScroll={handleScroll}
                divRefSiblings={[chart2Ref]}
                height={400}
                data={dataChart}
                xAxis={{ dataKey: 'name' }}
                yAxis={[
                  {
                    axisId: 'left',
                    labelValue: 'axis Y',
                  },
                ]}
                barChart={[
                  {
                    key: 'uv',
                    legendLabel: 'Uv',
                    color: 'red',
                  },
                  {
                    key: 'pv',
                    legendLabel: 'Pv',
                    color: 'green',
                  },
                  {
                    key: 'amt',
                    legendLabel: 'Amt',
                    color: 'blue',
                  },
                ]}
                tooltipContent={({ payload }) => (
                  <CustomTooltip>
                    {payload && payload[0] && payload[0].payload ? (
                      <>
                        <p className="text-primary font-s-100 font-weight-semibold pb-s-150">
                          {payload[0].payload.name}
                        </p>
                        <div className="d-flex justify-between align-items-center">
                          <p className="text-neutral-variant-80 pr-s-200">
                            Amt values:
                          </p>
                          <p className="text-neutral-variant-95 ml-auto">
                            {payload[0].payload.amt}
                          </p>
                        </div>
                        <div className="d-flex justify-between align-items-center">
                          <p className="text-neutral-variant-80 pr-s-200">
                            PV values:
                          </p>
                          <p className="text-neutral-variant-95 ml-auto">
                            {payload[0].payload.pv}
                          </p>
                        </div>
                        <div className="d-flex justify-between align-items-center">
                          <p className="text-neutral-variant-80 pr-s-200">
                            UV values:
                          </p>
                          <p className="text-neutral-variant-95 ml-auto">
                            {payload[0].payload.uv}
                          </p>
                        </div>
                      </>
                    ) : null}
                  </CustomTooltip>
                )}
              />
            </div>
            <div className="mt-s-300">
              <Chart
                title="Exemple B"
                chartId="IdGraficoB"
                toggle={true}
                scrollDivRef={chart2Ref}
                onScroll={handleScroll}
                divRefSiblings={[chart1Ref]}
                height={400}
                data={dataChart}
                xAxis={{ dataKey: 'name' }}
                yAxis={[
                  {
                    axisId: 'left',
                    labelValue: 'axis Y',
                  },
                  {
                    axisId: 'amt',
                    dataKey: 'amt',
                    labelValue: 'Amt',
                  },
                ]}
                barChart={[
                  {
                    key: 'uv',
                    legendLabel: 'Uv',
                    color: 'purple',
                  },
                ]}
                scatterChart={[
                  {
                    key: 'amt',
                    legendLabel: 'Amt',
                  },
                ]}
                scatterStarKey="bestBar"
                tooltipContent={({ payload }) => (
                  <CustomTooltip>
                    {payload && payload[0] && payload[0].payload ? (
                      <>
                        <p className="text-primary font-s-100 font-weight-semibold pb-s-150">
                          {payload[0].payload.name}
                        </p>
                        <div className="d-flex justify-between align-items-center">
                          <p className="text-neutral-variant-80 pr-s-200">
                            UV:{' '}
                          </p>
                          <p className="text-neutral-variant-95 ml-auto">
                            {payload[0].payload.uv}
                          </p>
                        </div>
                      </>
                    ) : null}
                  </CustomTooltip>
                )}
              />
            </div>
            <div className="mt-s-300">
              <Chart
                title="Exemple C - Few Bars"
                chartId="IdGraficoA"
                toggle={true}
                height={400}
                data={fewBars}
                xAxis={{ dataKey: 'name' }}
                yAxis={[
                  {
                    axisId: 'left',
                    labelValue: 'axis Y',
                  },
                ]}
                barChart={[
                  {
                    key: 'uv',
                    legendLabel: 'Uv',
                    color: 'red',
                  },
                  {
                    key: 'pv',
                    legendLabel: 'Pv',
                    color: 'green',
                  },
                  {
                    key: 'amt',
                    legendLabel: 'Amt',
                    color: 'blue',
                  },
                ]}
                tooltipContent={({ payload }) => (
                  <CustomTooltip>
                    {payload && payload[0] && payload[0].payload ? (
                      <>
                        <p className="text-primary font-s-100 font-weight-semibold pb-s-150">
                          {payload[0].payload.name}
                        </p>
                        <div className="d-flex justify-between align-items-center">
                          <p className="text-neutral-variant-80 pr-s-200">
                            Amt values:
                          </p>
                          <p className="text-neutral-variant-95 ml-auto">
                            {payload[0].payload.amt}
                          </p>
                        </div>
                        <div className="d-flex justify-between align-items-center">
                          <p className="text-neutral-variant-80 pr-s-200">
                            PV values:
                          </p>
                          <p className="text-neutral-variant-95 ml-auto">
                            {payload[0].payload.pv}
                          </p>
                        </div>
                        <div className="d-flex justify-between align-items-center">
                          <p className="text-neutral-variant-80 pr-s-200">
                            UV values:
                          </p>
                          <p className="text-neutral-variant-95 ml-auto">
                            {payload[0].payload.uv}
                          </p>
                        </div>
                      </>
                    ) : null}
                  </CustomTooltip>
                )}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
