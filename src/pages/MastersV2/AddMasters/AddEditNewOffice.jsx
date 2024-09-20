import { useEffect, useState, useMemo, useContext } from 'react';
import { Formik } from 'formik';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getTodaysDate } from '@/utils/dateHelper';
import {
  ButtonContainer,
  Container,
  Header,
  Heading,
  SidePanel,
} from '@/components/AddFormLayout/AddFormLayout';
import BreadCrumbs from '@/components/common/BreadCrumbs/BreadCrumbs';
import Button from '@/components/common/Button/Button';
import FormikTextField from '@/components/inputs/formik/FormikTextField';
import { APIS } from '@/constants/api.constant';
import { BUTTON_TYPES } from '@/constants/common.constant';
import { ROUTES } from '@/constants/route.constant';
import { getApi, patchApi, postApi } from '@/services/method';
import FormikAsyncDropdown from '@/components/inputs/formik/FormikAsyncDropdown/FormikAsyncDropdown';
import FormikDateField from '@/components/inputs/formik/FormikDateField';
import FormikDocumentUploder from '@/components/inputs/formik/FormikDocumentUploader/FormikDocumentUploader';
import FormikSwitch from '@/components/inputs/formik/FormikSwitch';
import {
  initialValues,
  PREMISESTYP_DROPDOWN,
  OFFICE_TYPES_DROPDOWN,
  schema,
} from './constant';

import AsyncDropdown from '@/components/officeDropDown/AsyncDropdown';
import Dropdown from '@/components/officeDropDown/Dropdown';
import AddressWithMap from '@/components/maps/AddressWithMap';
import { startSpcaeRemover } from '@/utils/common.helper';
import FormikCheckbox from '@/components/inputs/formik/FormikCheckbox';
import { CounterContext } from '@/components/Layout/commonLayout/TitleOfPageProvider';
const AddEditNewOffice = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [data, setData] = useState(initialValues);
  const [loading, setLoading] = useState(false);
  const [position] = useState(null);

  useEffect(() => {
    if (id) {
      setLoading(true);
      getApi(APIS.OFFICE, id)
        .then((res) => {
          const editData = res?.data?.office;

          setData((prev) => ({
            ...prev,
            officeId: editData?.officeId,
            busCategory: editData?.busCategory,
            premisesType: editData?.premisesType,
            officeType: editData?.officeType,
            name: {
              english: editData?.name?.english,
              id: editData?.name?.id,
              hindi: editData?.name?.hindi,
            },
            alias: editData?.alias,
            stateId: editData?.stateId ? editData?.stateId : null,
            regionId: editData?.regionId ? editData?.regionId : null,
            districtId: editData?.districtId ? editData?.districtId : null,

            nodalOfficer: editData?.nodalOfficer
              ? editData?.nodalOfficer
              : null,
            date: {
              from: editData?.date?.from,
              to: editData?.date?.to,
            },
            address: editData?.address,
            lat: editData?.lat,
            long: editData?.long,
            area: editData?.area,
            cityPopulation: editData?.cityPopulation,
            districtPopulation: editData?.districtPopulation,
            facilities: editData?.facilities ? editData?.facilities : null,
            image: editData?.image ? editData?.image : null,
            isActive: editData?.isActive,
          }));
        })
        .finally(() => setLoading(false));
    }
  }, [id]);

  const handleSubmit = (values, { setSubmitting, resetForm }) => {
    if (id) {
      values._id = id;
      patchApi(APIS.OFFICE, id, values).then(() => {
        toast.success('Data updated successfully');
        navigate(-1);
      });
    } else {
      postApi(APIS.OFFICE, values)
        .then(() => {
          toast.success('Data saved successfully');
          if (values?.saveAndNew) {
            resetForm();
            setData(initialValues);
          } else {
            navigate(-1);
          }
        })
        .finally(() => {
          setSubmitting(false);
        });
    }
  };
  const { setCount } = useContext(CounterContext);

  useEffect(() => {
    setCount('Masters');
  }, []);

  return (
    <Formik
      enableReinitialize
      initialValues={data}
      validationSchema={schema}
      onSubmit={handleSubmit}
    >
      {({
        isSubmitting,
        setFieldValue,
        handleSubmit: formikSubmit,
        values,
      }) => {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        useMemo(() => {
          if (position?.lat && position?.lng) {
            setFieldValue('lat', position?.lat);
            setFieldValue('long', position?.lng);
          }
          // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [position]);

        // eslint-disable-next-line react-hooks/rules-of-hooks
        useMemo(() => {
          if (
            ['depot', 'busStop', 'workshop', 'region', 'dhaba'].includes(
              values?.officeType
            )
          ) {
            if (values?.name?.id) {
              let endPoint = `v2/masters/${values?.officeType}`;
              let params = `${
                values?.name?.id ? `${values?.name?.id}?populate=true` : ''
              }`;
              getApi(endPoint, params).then((res) => {
                let resData;
                switch (values?.officeType) {
                  case 'busStop':
                    resData = res?.data?.busStop;
                    break;
                  case 'workshop':
                    resData = res?.data?.workshop;
                    break;
                  case 'region':
                    resData = res?.data?.region;
                    break;
                  case 'dhaba':
                    resData = res?.data?.foodCourt;
                    break;
                  default:
                    resData = res?.data?.depot;
                }
                setFieldValue('name.english', resData?.name?.english);
                setFieldValue('name.hindi', resData?.name?.hindi);
                setFieldValue('stateId', resData?.stateId?.id);
                setFieldValue('regionId', resData?.regionId?.id);
                setFieldValue('districtId', resData?.districtId?.id);
                if (values?.officeType === 'region') {
                  setFieldValue('regionId', resData?._id);
                }
              });
            }
          }
          // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [values?.name?.id]);
        // eslint-disable-next-line react-hooks/rules-of-hooks
        useMemo(() => {
          if (values.officeType === 'ho') {
            setFieldValue('name.id', '660bd0c1111febdfca7be9bc');
            setFieldValue('name.hindi', 'Head office');
            setFieldValue('name.english', 'Head office');
            setFieldValue('stateId', '660bd0c8471febdfca7be9bc');
            setFieldValue('regionId', '663384c2d05f158dd58e5a4d');
            setFieldValue('districtId', '66338463d05f158dd58e5a43');
          }
          // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [values.officeType]);

        // eslint-disable-next-line react-hooks/rules-of-hooks
        useMemo(() => {
          if (!values?.fuel?.diesel) {
            setFieldValue('fuel.dieselVendor', '');
          }

          if (!values?.fuel?.cng) {
            setFieldValue('fuel.cngVender', '');
          }
          if (values?.fuel?.chargingStation) {
            setFieldValue('fuel.chargingStationVendor', '');
          }
          // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [
          values?.fuel?.diesel,
          values?.fuel?.cng,
          values?.fuel?.chargingStation,
        ]);
        return (
          <Container>
            <div className="">
              {loading ? (
                <div>Loading...</div>
              ) : (
                <>
                  <Header>
                    <div>
                      <BreadCrumbs
                        backNavi={() => navigate(-1)}
                        breadCrumbs={[{ name: 'Master', path: ROUTES.MASTERS }]}
                        boldItem={'Office'}
                      />
                      <Heading>{id ? 'Edit' : 'Add'} Office</Heading>
                    </div>
                    <ButtonContainer>
                      <Button
                        type={BUTTON_TYPES.SECONDARY}
                        onClick={() => navigate(-1)}
                        disabled={isSubmitting}
                      >
                        Cancel
                      </Button>
                      {!id && (
                        <Button
                          type={BUTTON_TYPES.SECONDARY}
                          onClick={() => {
                            values.saveAndNew = true;
                            formikSubmit();
                          }}
                          disabled={isSubmitting && values?.saveAndNew === true}
                        >
                          Save & Add New
                        </Button>
                      )}
                      <Button
                        type={BUTTON_TYPES.PRIMARY}
                        onClick={formikSubmit}
                        loading={isSubmitting && !values?.saveAndNew}
                      >
                        {id ? 'Update' : 'Save'}
                      </Button>
                    </ButtonContainer>
                  </Header>

                  <div
                    className="add-v-form-bottom-section"
                    style={{ paddingBottom: '20px' }}
                  >
                    <div
                      className="add-v-form"
                      style={{ padding: '20px', justifyContent: 'center' }}
                    >
                      <div className="add-v-form-right-section">
                        <div className="add-v-form-section">
                          <SidePanel
                            title={`Office Details [En]`}
                            // description={`Enter Personal Information Here`}
                          />
                          <div>
                            <FormikSwitch label="Is Active?" name="isActive" />
                          </div>
                          <div className="group-type-3-equal">
                            <div className="w-100 flex-1">
                              {' '}
                              <FormikTextField
                                label="Office ID"
                                placeholder="Enter Office ID"
                                name="officeId"
                                isRequired={true}
                              />
                            </div>

                            <div className="w-100 flex-1">
                              <Dropdown
                                label="Office Type"
                                placeholder="Select Office Type"
                                name="officeType"
                                key="officeType"
                                rest={values.officeType === '' ? true : false}
                                isRequired={true}
                                defaultStatus={id ? true : false}
                                defaultValue={
                                  values.officeType === 'ho'
                                    ? 'HO'
                                    : values.officeType === 'depot'
                                      ? 'Depot'
                                      : values.officeType === 'region'
                                        ? 'RO'
                                        : values.officeType === 'busStop'
                                          ? 'Bus Stop'
                                          : values.officeType === 'busStop'
                                            ? 'Bus Station'
                                            : values.officeType === 'workshop'
                                              ? 'Workshop'
                                              : ''
                                }
                                options={OFFICE_TYPES_DROPDOWN}
                                callback={() => {
                                  setFieldValue('name.id', '');
                                  setFieldValue('name.english', '');
                                  setFieldValue('name.hindi', '');
                                  setFieldValue('stateId', '');
                                  setFieldValue('regionId', '');
                                  setFieldValue('districtId', '');
                                }}
                              />
                            </div>
                            <div className="w-100 flex-1">
                              <Dropdown
                                label="Premises Type"
                                placeholder="Select Premises"
                                name="premisesType"
                                key={'premisesType'}
                                rest={values.premisesType === '' ? true : false}
                                isRequired={true}
                                defaultStatus={id ? true : false}
                                defaultValue={values.premisesType}
                                options={PREMISESTYP_DROPDOWN}
                              />
                            </div>
                          </div>

                          <div className="group-type-3-equal">
                            <div className="flex-1">
                              {values?.officeType === 'ho' ? (
                                <Dropdown
                                  label="Name"
                                  placeholder="Select Name"
                                  name="name.id"
                                  isRequired={true}
                                  defaultStatus={true}
                                  defaultValue="Head Office"
                                  allwasyDisable={true}
                                  options={[
                                    {
                                      label: 'Head Office',
                                      value: 'Head Office',
                                    },
                                  ]}
                                  callback={() => {
                                    setFieldValue('name.id', '');
                                    setFieldValue('name.english', '');
                                    setFieldValue('name.hindi', '');
                                    setFieldValue('stateId', '');
                                    setFieldValue('regionId', '');
                                    setFieldValue('districtId', '');
                                  }}
                                />
                              ) : (
                                <AsyncDropdown
                                  label="Name"
                                  lablePrefix={{}}
                                  name="name.id"
                                  isDisabled={!values.officeType}
                                  placeholder="Select Name"
                                  apikey={values.officeType}
                                  defaultStatus={id ? true : false}
                                  defaultValue={values.name.id}
                                  isRequired={true}
                                />
                              )}
                            </div>
                            <div className="flex-1">
                              <FormikTextField
                                label="Alias Name"
                                placeholder="Enter Alias Name"
                                name="alias"
                                onChange={(e) => {
                                  let value = e.target.value;
                                  setFieldValue(
                                    'alias',
                                    startSpcaeRemover(value)
                                  );
                                }}
                              />
                            </div>
                            <div className="flex-1">
                              <AsyncDropdown
                                label="Category Bus Station"
                                lablePrefix={{}}
                                name="busCategory"
                                placeholder="Select category bus station"
                                apikey={'group-in-depot'}
                                isDisabled={
                                  values.officeType !== 'busStop' ? true : false
                                }
                                rest={
                                  values.busCategory === null ? true : false
                                }
                                defaultStatus={id ? true : false}
                                defaultValue={values.busCategory}
                              />
                            </div>
                          </div>
                          <div className="add-v-form-section">
                            <div className="group-type-3-equal">
                              <div className="d-flex w-100">
                                <AsyncDropdown
                                  label="State"
                                  lablePrefix={{}}
                                  name="stateId"
                                  isDisabled={!values.name?.id}
                                  allwasyDisable={true}
                                  placeholder="Select State"
                                  apikey={'state'}
                                  defaultStatus={
                                    values?.name?.id ? true : false
                                  }
                                  defaultValue={values.stateId}
                                  isRequired={true}
                                />
                              </div>
                              <div className="d-flex w-100">
                                <AsyncDropdown
                                  label="Region"
                                  isDisabled={
                                    !values.stateId || !values?.name?.id
                                  }
                                  lablePrefix={{}}
                                  placeholder="Select Region"
                                  allwasyDisable={true}
                                  isRequired={true}
                                  name="regionId"
                                  apikey="region"
                                  defaultStatus={
                                    values?.name?.id ? true : false
                                  }
                                  defaultValue={values.regionId}
                                  // options={dropdownData?.region}
                                  // defaultValue={values?.regionId}
                                />
                              </div>
                              <div className="d-flex w-100">
                                <AsyncDropdown
                                  isDisabled={
                                    !values?.name?.id ||
                                    !values.stateId ||
                                    !values.regionId
                                  }
                                  label="District"
                                  lablePrefix={{}}
                                  placeholder="Select District"
                                  name="districtId"
                                  allwasyDisable={
                                    values.officeType === 'depot' ? true : false
                                  }
                                  apikey="region"
                                  defaultStatus={
                                    values?.name?.id ? true : false
                                  }
                                  defaultValue={values.districtId}
                                  isRequired={true}
                                  filterdValue={'district'}
                                  filteredId={values.regionId}
                                  filterdFunction={(res) => {
                                    return Object.values(res?.data)?.[0]
                                      ?.districtId;
                                  }}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div
                      className="add-v-form pt-43"
                      style={{ padding: '20px', justifyContent: 'center' }}
                    >
                      <div className="add-v-form-right-section">
                        <div className="add-v-form-section">
                          <SidePanel
                            title={`Nodal Officer`}
                            // description={`Enter Personal Information Here`}
                          />
                          <div className="group-type-3-equal">
                            <div className="flex-1">
                              <FormikAsyncDropdown
                                label="Name"
                                placeholder="Select Nodal Officer"
                                name="officerId"
                                // isRequired={true}
                              />
                            </div>
                            <div className="flex-1">
                              <FormikDateField
                                max={getTodaysDate()}
                                label="Service Posting Start Date"
                                name="date.from"
                              />
                            </div>
                            <div className="flex-1">
                              <FormikDateField
                                min={getTodaysDate()}
                                label="Service Posting End Date"
                                name="date.to"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div
                      className="add-v-form pt-43"
                      style={{ padding: '20px', justifyContent: 'center' }}
                    >
                      <div className="add-v-form-right-section">
                        <div className="add-v-form-section">
                          <SidePanel
                            title={`Fuel & Charging`}
                            // description={`Enter Personal Information Here`}
                          />

                          <div className="group-type-3-equal">
                            <div className="flex-1">
                              <FormikCheckbox
                                id="fuel.diesel"
                                name="fuel.diesel"
                                label="Diesel"
                              />
                            </div>
                            <div className="flex-1">
                              <FormikCheckbox
                                id="fuel.cng"
                                name="fuel.cng"
                                label="CNG"
                              />
                            </div>
                            <div className="flex-1">
                              <FormikCheckbox
                                id="fuel.chargingStation"
                                name="fuel.chargingStation"
                                label="Charging Station"
                              />
                            </div>
                          </div>

                          <div className="group-type-3-equal">
                            <div className="flex-1">
                              {values.fuel.diesel && (
                                <FormikTextField
                                  label="Vendor"
                                  placeholder="Enter vendor name"
                                  name="fuel.dieselVendor"
                                />
                              )}
                            </div>
                            <div className="flex-1">
                              {values.fuel.cng && (
                                <FormikTextField
                                  label="Vendor"
                                  placeholder="Enter vendor name"
                                  name="fuel.cngVender"
                                />
                              )}
                            </div>
                            <div className="flex-1">
                              {values.fuel.chargingStation && (
                                <FormikTextField
                                  label="Vendor"
                                  placeholder="Enter vendor name"
                                  name="fuel.chargingStationVendor"
                                />
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <AddressWithMap
                      values={values}
                      setFieldValue={setFieldValue}
                      area
                    />
                    <div
                      className="add-v-form pt-43"
                      style={{ padding: '20px', justifyContent: 'center' }}
                    >
                      <div className="add-v-form-right-section">
                        <div className="add-v-form-section">
                          <SidePanel
                            title={`Facilities`}
                            // description={`Enter Personal Information Here`}
                          />
                          <div className="group-type-1">
                            <FormikAsyncDropdown
                              label="Office Facilities"
                              placeholder="Select Office Facilities"
                              name="facilities"
                              id="officeFacility"
                              isMulti
                              // isRequired={true}
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div
                      className="add-v-form pt-43"
                      style={{ padding: '20px', justifyContent: 'center' }}
                    >
                      <div className="add-v-form-right-section">
                        <div className="add-v-form-section">
                          <SidePanel
                            title={`Images`}
                            // description={`Enter Personal Information Here`}
                          />
                          <div className="group-type-1">
                            <div className="image-uploder-block">
                              <FormikDocumentUploder
                                name="image"
                                id="office-image"
                                title="Upload Multiple Office Images"
                                message="or drag & drop Office image files here"
                                btnText="BROWSE FILE"
                                bottomMessage="Supported File Format: jpeg, png (upto 1 MB)"
                                accept="image/*"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div
                      className="add-v-form pt-43"
                      style={{ padding: '20px', justifyContent: 'center' }}
                    >
                      <div className="add-v-form-right-section">
                        <div className="add-v-form-section">
                          <SidePanel
                            title={`Office Details [Hn]`}
                            // description={`Enter Personal Information Here`}
                          />
                          <div className="group-type-1-33">
                            <FormikTextField
                              label="Name"
                              placeholder="Enter Name"
                              name="name.hindi"
                              isRequired={true}
                              onChange={(e) => {
                                let value = e.target.value;
                                setFieldValue(
                                  'name.hindi',
                                  startSpcaeRemover(value)
                                );
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </Container>
        );
      }}
    </Formik>
  );
};

export default AddEditNewOffice;
