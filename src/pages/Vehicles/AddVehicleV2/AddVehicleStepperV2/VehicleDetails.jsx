import {
  meterIcon2 as MeterIcon,
  seatIcon as SeatIcon,
  semiSeatIcon as SemiSeatIcon,
} from '@/assets/Icons';
import { SidePanel } from '@/components/AddFormLayout/AddFormLayout';
import Button from '@/components/common/Button/Button';
import { CustomSelectById } from '@/components/common/CustomSelect';
import CustomOptionSelect from '@/components/common/CustomSelect/CustomOptionSelect';
import { DatePickerInput } from '@/components/common/DateTimeInputs';
import FormikAsyncDropdown from '@/components/inputs/formik/FormikAsyncDropdown/FormikAsyncDropdown';
import FormikDateField from '@/components/inputs/formik/FormikDateField';
import FormikDocumentUploder from '@/components/inputs/formik/FormikDocumentUploader/FormikDocumentUploader';
import FormikDropdown from '@/components/inputs/formik/FormikDropdown/FormikDropdown';
import FormikSwitch from '@/components/inputs/formik/FormikSwitch';
import FormikTextField from '@/components/inputs/formik/FormikTextField';
import { BUTTON_TYPES } from '@/constants/common.constant';
import { generateRandomString } from '@/lib/utils';
import { getTodaysDate, getYears } from '@/utils/dateHelper';
import { Grid } from '@mui/material';

const VehicleDetails = ({ values, setFieldValue }) => {
  const YEARS_DROPDOWN = getYears().map((year) => ({
    label: year,
    value: year,
  }));
  return (
    <div className="form-content-container ">
      <div className="border-v add-v-form-section w100 add-edit-user-card section-shadow">
        <SidePanel
          title={`Identification`}
        />
        <div className="add-v-form-right-section">
          <div className="add-v-form-section">
            <div className="group-type-2-70-30">
              <div className="group-type-1-70">
                <FormikTextField
                  isRequired
                  label="Vehicle Registration Number / License Plate"
                  placeholder="Enter Registration Number / License Plate(UP32 PF 2345)"
                  name="identification.registrationNumber"
                />
              </div>
              <div className="mt4 check-vahan-aligned">
                <Button
                  type={BUTTON_TYPES.PRIMARY}
                  onClick={() => {
                    console.log('vahan clicked')
                  }}
                >
                  Check by VAHAN
                </Button>
              </div>
            </div>
            <div className="group-type-3-equal">
              <div className="flex-1 w-100">
                <FormikTextField
                  readOnly
                  value={`${values?.identification?.registrationNumber
                    ? values?.identification?.registrationNumber
                    : ''
                    }`}
                  label="Vehicle Name"
                  placeholder="Enter Vehicle Name"
                  name="identification.name"
                />
              </div>
              <div className="flex-1 w-100">
                <FormikTextField
                  label="Chassis Number / VIN"
                  type="name"
                  placeholder="Enter Chassis Number / VIN"
                  name="identification.chassisNumber"
                  isRequired
                />
              </div>
              <div className="flex-1 w-100">
                <FormikTextField
                  label="Engine Number"
                  type="name"
                  placeholder="Enter Engine Number"
                  name="identification.engineNumber"
                  isRequired
                />
              </div>
            </div>
            <div className="group-type-3-equal">
              <div className="flex-1 w-100">
                <CustomSelectById
                  id="chassisBodyType"
                  isMulti={false}

                  refetch={values?.identification?.chassisBodyTypeId && generateRandomString()}
                  useFormik={true}
                  name="identification.chassisBodyTypeId"
                  onChange={(e) => {
                    setFieldValue('identification.chassisBodyTypeId', e?.value)
                  }}
                  label="Chassis / Body Type"
                  showLabel={true}
                  filters={{
                  }}
                  defaultValue={values?.identification?.chassisBodyTypeId}
                  selectProps={{
                    placeholder: 'Select',
                    isClearable: true,

                  }}
                /></div>
              <div className="flex-1 w-100">
                <CustomSelectById
                  id="fuelType"
                  isMulti={false}

                  refetch={values?.identification.fuelTypeId && generateRandomString()}
                  useFormik={true}
                  name="identification.fuelTypeId"
                  onChange={(e) => {
                    setFieldValue('identification.fuelTypeId', e?.value)
                  }}
                  label="Fuel Type"
                  showLabel={true}
                  filters={{
                  }}
                  defaultValue={values?.identification.fuelTypeId}
                  selectProps={{
                    placeholder: 'Select',
                    isClearable: true,

                  }}
                />



              </div>
            </div>
            <div className="group-type-3-equal">
              <div className="flex-1 w-100">
                <CustomSelectById
                  id="vehicleMake"
                  isMulti={false}

                  refetch={values?.identification.makeId && generateRandomString()}
                  useFormik={true}
                  name="identification.makeId"
                  onChange={(e) => {
                    setFieldValue('identification.makeId', e?.value)

                    setFieldValue('identification.modelId', null);
                    setFieldValue('identification.trimId', null);
                  }}
                  label="Make"
                  showLabel={true}
                  filters={{
                  }}
                  defaultValue={values?.identification?.makeId}
                  selectProps={{
                    placeholder: 'Select',
                    isClearable: true,

                  }}
                />

              </div>
              <div className="flex-1 w-100">
                <CustomSelectById
                  id="vehicleModel"
                  isMulti={false}

                  refetch={values?.identification?.modelId && generateRandomString()}
                  useFormik={true}
                  name="identification.modelId"
                  onChange={(e) => {
                    setFieldValue('identification.trimId', null);
                    setFieldValue('identification.modelId', e?.value)
                  }}
                  label="Model"
                  showLabel={true}
                  filters={{
                    vehicleMakeId: values?.identification?.makeId,
                  }}
                  defaultValue={values?.identification?.modelId}
                  selectProps={{
                    placeholder: 'Select',
                    isClearable: true,

                    isDisabled: !values?.identification?.makeId,
                  }}
                />
              </div>
              <div className="flex-1 w-100">

                <CustomSelectById
                  id="vehicleTrim"
                  isMulti={false}

                  refetch={values?.identification.trimId && generateRandomString()}
                  useFormik={true}
                  name="identification.trimId"
                  onChange={(e) => {
                    setFieldValue('identification.trimId', e?.value)
                  }}
                  label="Trim"
                  showLabel={true}
                  filters={{

                    vehicleMakeId: values?.identification?.makeId,
                    vehicleModelId: values?.identification?.modelId,
                  }}
                  defaultValue={values?.identification?.trimId}
                  selectProps={{
                    placeholder: 'Select',
                    isClearable: true,

                    isDisabled: !values?.identification?.modelId,
                  }}
                />
              </div>
            </div>
            <div className="group-type-3-equal">
              <div className="flex-1 w-100">
                <CustomOptionSelect
                  name="identification.manufacturingYear"
                  label="Manufacturing Year"
                  placeholder="Select"
                  options={YEARS_DROPDOWN}
                />
              </div>
              <div className="flex-1 w-100">

                <CustomSelectById
                  id="modelEuro"
                  isMulti={false}

                  refetch={values?.identification.modelEuroId && generateRandomString()}
                  useFormik={true}
                  name="identification.modelEuroId"
                  onChange={(e) => {
                    setFieldValue('identification.modelEuroId', e?.value)
                  }}
                  label="Model Euro"
                  showLabel={true}
                  filters={{
                  }}
                  defaultValue={values?.identification.modelEuroId}
                  selectProps={{
                    placeholder: 'Select',
                    isClearable: true,
                  }}
                />



              </div>

              <div className="flex-1 w-100">

                <CustomSelectById
                  id="vehicleColour"
                  isMulti={false}

                  refetch={values?.identification.colourId && generateRandomString()}
                  useFormik={true}
                  name="identification.colourId"
                  onChange={(e) => {
                    setFieldValue('identification.colourId', e?.value)
                  }}
                  label="Vehicle Colour"
                  showLabel={true}
                  filters={{
                  }}
                  defaultValue={values?.identification.colourId}
                  selectProps={{
                    placeholder: 'Select',
                    isClearable: true,
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="border-v add-v-form-section w100 add-edit-user-card pt-43">
        <SidePanel
          title={`Service Details`}
        />
        <div className="add-v-form-right-section">
          <div className="add-v-form-section">
            <div className="group-type-3-equal">
              <div className="flex-1 w-100">
                <FormikTextField
                  label="Registering Authority"
                  type="name"
                  placeholder="Enter Registering Authority"
                  name="serviceDetail.registeringAuthority"
                />
              </div>
              <div className="flex-1 w-100">

                <CustomSelectById
                  id="district"
                  isMulti={false}

                  refetch={values?.serviceDetail?.registrationDistrictId && generateRandomString()}
                  useFormik={true}
                  name="serviceDetail.registrationDistrictId"
                  onChange={(e) => {
                    setFieldValue('serviceDetail.registrationDistrictId', e?.value)
                  }}
                  label="Registration District"
                  showLabel={true}
                  filters={{
                  }}
                  defaultValue={values?.serviceDetail?.registrationDistrictId}
                  selectProps={{
                    placeholder: 'Select',
                    isClearable: true,
                  }}
                />

              </div>
              <div className="flex-1 w-100">
                <DatePickerInput
                  minDate={getTodaysDate()}
                  name="serviceDetail.RCValidityDate"
                  labelName="RC Validity"
                  placeholder="DD MM YYYY"
                />
              </div>
            </div>

            <div className="group-type-3-equal">
              <div className="flex-1 w-100">

                <CustomSelectById
                  id="state"
                  isMulti={false}

                  refetch={values?.serviceDetail?.registrationStateId && generateRandomString()}
                  useFormik={true}
                  name="serviceDetail.registrationStateId"
                  onChange={(e) => {
                    setFieldValue('serviceDetail.registrationStateId', e?.value)
                  }}
                  label="Registration State"
                  showLabel={true}
                  filters={{
                  }}
                  defaultValue={values?.serviceDetail?.registrationStateId}
                  selectProps={{
                    placeholder: 'Select',
                    isClearable: true,
                  }}
                />


              </div>

              <div className="flex-1 w-100">
                <DatePickerInput
                  maxDate={getTodaysDate()}
                  name="serviceDetail.registrationDate"
                  labelName="Registration"
                  placeholder="DD MM YYYY"
                />
              </div>
              <div className="flex-1 w-100">
                <DatePickerInput
                  name="serviceDetail.allotmentDate"
                  labelName="Service Allotment"
                  placeholder="DD MM YYYY"
                />
              </div>
            </div>
            <div className="group-type-3-equal">
              <div className="flex-1 w-100">
                <DatePickerInput
                  name="serviceDetail.insuranceValidity"
                  labelName="Insurance Validity"
                  placeholder="DD MM YYYY"
                  minDate={getTodaysDate()}
                />
              </div>
              <div className="flex-1 w-100">
                <DatePickerInput
                  name="serviceDetail.roadTaxValidity"
                  labelName="Road Tax Validity"
                  minDate={getTodaysDate()}
                  placeholder="DD MM YYYY"
                />
              </div>
              <div className="flex-1 w-100">
                <DatePickerInput
                  name="serviceDetail.pollutionValidity"
                  labelName="Pollution Validity"
                  placeholder="DD MM YYYY"
                  minDate={getTodaysDate()}
                />
              </div>
            </div>
            <div className="group-type-3-equal">
              <div className="flex-1 w-100">

                <CustomSelectById
                  id="state"
                  isMulti={false}

                  refetch={values?.serviceDetail?.stateId && generateRandomString()}
                  useFormik={true}
                  name="serviceDetail.stateId"
                  onChange={(e) => {

                    setFieldValue('serviceDetail.regionId', null);
                    setFieldValue('serviceDetail.depotId', null);
                    setFieldValue('serviceDetail.stateId', e?.value)
                  }}
                  label="State"
                  showLabel={true}
                  filters={{
                  }}
                  defaultValue={values?.serviceDetail?.stateId}
                  selectProps={{
                    placeholder: 'Select',
                    isClearable: true,

                  }}
                />
              </div>
              <div className="flex-1 w-100">
                <CustomSelectById
                  id="region"
                  isMulti={false}

                  refetch={values?.serviceDetail?.regionId && generateRandomString()}
                  useFormik={true}
                  name="serviceDetail.regionId"
                  onChange={(e) => {

                    setFieldValue('serviceDetail.regionId', e?.value);
                    setFieldValue('serviceDetail.depotId', null);
                  }}
                  label="Region"
                  showLabel={true}
                  filters={{
                    stateId: values?.serviceDetail?.stateId
                  }}
                  defaultValue={values?.serviceDetail?.regionId ? values?.serviceDetail?.regionId : ''}
                  selectProps={{
                    placeholder: 'Select',
                    isClearable: true,

                    isDisabled: !values?.serviceDetail?.stateId

                  }}
                />
              </div>
              <div className="flex-1 w-100">

                <CustomSelectById
                  id="depot"
                  isMulti={false}

                  refetch={values?.serviceDetail?.depotId && generateRandomString()}
                  useFormik={true}
                  name="serviceDetail.depotId"
                  onChange={(e) => {

                    setFieldValue('serviceDetail.depotId', e?.value);
                  }}
                  label="Depot"
                  showLabel={true}
                  filters={{

                    stateId: values?.serviceDetail?.stateId,
                    regionId: values?.serviceDetail?.regionId,
                  }}
                  defaultValue={values?.serviceDetail?.depotId ? values?.serviceDetail?.depotId : ''}
                  selectProps={{
                    placeholder: 'Select',
                    isClearable: true,

                    isDisabled: !values?.serviceDetail?.regionId

                  }}
                />



              </div>
            </div>
            <div className="group-type-3-equal">
              <div className="flex-1 w-100">
                <CustomSelectById
                  id="busCategory"
                  isMulti={false}

                  refetch={values?.serviceDetail?.categoryId && generateRandomString()}
                  useFormik={true}
                  name="serviceDetail.categoryId"
                  onChange={(e) => {

                    setFieldValue('serviceDetail.categoryId', e?.value);
                  }}
                  label="Vehicle Category"
                  showLabel={true}
                  filters={{
                  }}
                  defaultValue={values?.serviceDetail?.categoryId}
                  selectProps={{
                    placeholder: 'Select',
                    isClearable: true,


                  }}
                />



              </div>
              <div className="flex-1 w-100">

                <CustomSelectById
                  id="vehicleGroup"
                  isMulti={false}

                  refetch={values?.serviceDetail?.groupId && generateRandomString()}
                  useFormik={true}
                  name="serviceDetail.groupId"
                  onChange={(e) => {

                    setFieldValue('serviceDetail.groupId', e?.value);
                  }}
                  label="Vehicle Group"
                  showLabel={true}
                  filters={{
                  }}
                  defaultValue={values?.serviceDetail?.groupId ? values?.serviceDetail?.groupId : ''}
                  selectProps={{
                    placeholder: 'Select',
                    isClearable: true,


                  }}
                />

              </div>
              <div className="flex-1 w-100">

                <CustomSelectById
                  id="busServiceType"
                  isMulti={false}

                  refetch={values?.serviceDetail?.serviceTypeId && generateRandomString()}
                  useFormik={true}
                  name="serviceDetail.serviceTypeId"
                  onChange={(e) => {
                    setFieldValue('serviceDetail.serviceTypeId', e?.value)
                  }}
                  label="Vehicle Service Type"
                  showLabel={true}
                  filters={{
                  }}
                  defaultValue={values?.serviceDetail?.serviceTypeId}
                  selectProps={{
                    placeholder: 'Select',
                    isClearable: true,
                  }}
                />


              </div>
            </div>
            <div className="group-type-4-1-33-3-equal">
              <div className="eleven-left">

                <CustomSelectById
                  id="seatingConfiguration"
                  isMulti={false}

                  refetch={values?.seatingConfiguration?.seatingConfigurationId && generateRandomString()}
                  useFormik={true}
                  name="seatingConfiguration.seatingConfigurationId"
                  onChange={(e) => {
                    setFieldValue('seatingConfiguration?.seatingConfigurationId', e?.value)
                  }}
                  label="Seating Configuration"
                  showLabel={true}
                  filters={{
                  }}
                  defaultValue={values?.seatingConfiguration?.seatingConfigurationId}
                  selectProps={{
                    placeholder: 'Select',
                    isClearable: true,
                  }}
                />


              </div>
              <div className="eleven-right">
                <div className="flex-1">
                  <FormikTextField
                    label="Seat (Sitting)"
                    // type="number"
                    min={1}
                    placeholder="Enter"
                    name="seatingConfiguration.totalSeats"
                    prefix={
                      <span className="z-auto relative">
                        <SeatIcon width={25} height={20} />
                      </span>
                    }
                  />
                </div>
                <div className="flex-1">
                  <FormikTextField
                    initialValues={{ number: 0 }}
                    label="Seat (Semi Sleeper)"
                    placeholder="Enter"
                    name="seatingConfiguration.semiSleeper"
                    prefix={<SemiSeatIcon width={25} height={20} />}
                  />
                </div>
                <div className="flex-1">
                  <FormikTextField
                    label="Seat (Sleeper)"
                    placeholder="Enter"
                    name="seatingConfiguration.sleeper"
                    prefix={<SeatIcon width={25} height={20} />}
                  />
                </div>
              </div>
            </div>
            <div className="group-type-3-equal">
              <div className="flex-1 w-100">
                <FormikTextField
                  label="Odometer Reading"
                  type="text"
                  placeholder="Enter Odometer Reading Depot"
                  name="serviceDetail.reading"
                  prefix={<MeterIcon width={25} height={20} />}
                />
              </div>

              <div className="flex-1 w-100">

                <CustomSelectById
                  id="Blacklist"
                  isMulti={false}

                  refetch={values?.serviceDetail?.blacklistStatus && generateRandomString()}
                  useFormik={true}
                  name="serviceDetail.blacklistStatus"
                  onChange={(e) => {
                    setFieldValue('serviceDetail.blacklistStatus', e?.value)
                  }}
                  label="Blacklist Status"
                  showLabel={true}
                  filters={{
                  }}
                  defaultValue={values?.serviceDetail?.blacklistStatus}
                  selectProps={{
                    placeholder: 'Select',
                    isClearable: true,
                  }}
                />



              </div>
              <div className="flex-1 w-100">
                <FormikTextField
                  label="Blacklist Reason"
                  type="name"
                  placeholder="Enter Blacklist Reason"
                  name="identification.blacklistReason"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="border-v add-v-form-section w100 add-edit-user-card pt-43 ">
        <SidePanel
          title={`Vendor Details`}
        />
        <div className="add-v-form-right-section">
          <div className="add-v-form-section">


            <div className="group-type-3-equal">
              <div className="flex-1 w-100">
                <CustomSelectById
                  id="fabricator"
                  isMulti={false}

                  refetch={values?.additionalDetail?.fabricatorId && generateRandomString()}
                  useFormik={true}
                  name="additionalDetail.fabricatorId"
                  onChange={(e) => {
                    setFieldValue('serviceDetail.blacklistStatus', e?.value)
                  }}
                  label="Fabricator"
                  showLabel={true}
                  filters={{
                  }}
                  defaultValue={values?.additionalDetail?.fabricatorId}
                  selectProps={{
                    placeholder: 'Select',
                    isClearable: true,
                  }}
                />
              </div>
              <div className="flex-1 w-100">
                <CustomSelectById
                  id="busOwnership"
                  isMulti={false}

                  refetch={values?.additionalDetail?.ownershipId && generateRandomString()}
                  useFormik={true}
                  name="additionalDetail.ownershipId"
                  onChange={(e) => {
                    if (e.label === 'Owned')
                      setFieldValue(
                        'additionalDetail.operatorId',
                        '66348f81fd2359e09b97cffc'
                      );
                  }}
                  label="Ownership"
                  showLabel={true}
                  filters={{
                  }}
                  defaultValue={values?.additionalDetail?.ownershipId}
                  selectProps={{
                    placeholder: 'Select',
                    isClearable: true,
                  }}
                />
              </div>
              <div className="flex-1 w-100">

                <CustomSelectById
                  id="operator"
                  isMulti={false}

                  refetch={values?.additionalDetail?.operatorId && generateRandomString()}
                  useFormik={true}
                  name="additionalDetail?.operatorId"
                  onChange={(e) => {
                    setFieldValue('additionalDetail.operatorId', e.value);

                  }}
                  label="Operator"
                  showLabel={true}
                  filters={{
                  }}
                  defaultValue={values?.additionalDetail?.operatorId}
                  selectProps={{
                    placeholder: 'Select',
                    isClearable: true,
                    isDisabled:
                      values?.additionalDetail?.ownershipId ===
                      '6633c918228b627a89d5a99f'

                  }}
                />
              </div>
            </div>

            <div className="image-uploder-block">
              <FormikDocumentUploder
                name="identification.images"
                id="vehicle-identification-image"
                title="Upload Multiple Vehicle Images"
                message="or drag & drop vehicle image files here"
                btnText="BROWSE FILE"
                bottomMessage="Supported File Format: jpeg, png (upto 1 MB)"
                accept="image/*"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VehicleDetails;
