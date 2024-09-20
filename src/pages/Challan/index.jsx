import React, { useContext, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import BreadCrumbs from '@/components/common/BreadCrumbs/BreadCrumbs';
import TextField from '@/components/inputs/formik/TextField/TextField';
import { FormControlLabel, Switch } from '@mui/material';
import { CounterContext } from '@/components/Layout/commonLayout/TitleOfPageProvider';

const initialValues = {
  violatorName: '',
  dlRcNumber: '',
  challanNo: '',
  transactionId: '',
  state: '',
  challanDate: '',
  amount: '',
  status: '',
  paymentSource: '',
  challanPrint: true,
  receipt: false,
  payment: '',
  paymentVerify: '',
};

const Challan = () => {
  const {setCount } = useContext(CounterContext);

  useEffect(() => { 
    setCount('Challan');
  }, []);

  const onSubmit = (values, { setSubmitting }) => {
    // Handle form submission here

    setSubmitting(false);
  };

  return (
    <div className="add-v-main-container">
      <div className="add-v-form-container">
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validate={(values) => {
            const errors = {};
            // Add custom validation logic here if needed
            return errors;
          }}
        >
          {({
            isSubmitting,
            handleBlur,
            handleChange,
            values,
            setFieldValue,
          }) => (
            <>
              {' '}
              <div className="add-v-form-top-section">
                <div className="top-upper-section d-h-between">
                  <div>
                    <div className="heading-600-24 c-blue1 v-center pt-7x">
                      Challan
                    </div>
                  </div>
                  <div className="add-v-form-top-button flex gap-15px">
                    <button
                      className="blue-button heading-700-15"
                      type="submit"
                    >
                      Save
                    </button>
                  </div>
                </div>
                <div className="top-bottom-section"></div>
              </div>
              <div className="add-v-form-bottom-section">
                <div
                  style={{
                    height: 'calc(100vh - 345px)',
                    overflowY: 'scroll',
                    paddingBottom: '20px',
                  }}
                >
                  <div className={`add-v-form`}>
                    <div className="add-v-form-left-section">
                      <div className="heading-600-16 c-blue1">Challan</div>
                      <div className="heading-400-12 c-gray2">
                        Add Challan Details
                      </div>
                    </div>
                    <div className="add-v-form-right-section">
                      <div className="add-v-form-section">
                        <div className="flex justify-between gap-10  py-2">
                          <TextField
                            labelName="Violator name"
                            placeholder="Enter violator name"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            type="text"
                            name="violatorName"
                            value={values?.violatorName}
                          />
                          <TextField
                            labelName="DL/Rc number"
                            placeholder="Enter DL/Rc number"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            type="text"
                            name="dlRcNumber"
                            value={values?.dlRcNumber}
                          />
                          <TextField
                            labelName="Challan no"
                            placeholder="Enter challan no"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            type="text"
                            name="challanNo"
                            value={values?.challanNo}
                          />
                        </div>
                        <div className="flex justify-between gap-10 py-2">
                          <TextField
                            labelName="Transaction Id"
                            placeholder="Enter transaction Id"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            type="text"
                            name="transactionId"
                            value={values?.transactionId}
                          />
                          <TextField
                            labelName="State"
                            placeholder="Enter state"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            type="text"
                            name="state"
                            value={values?.state}
                          />
                          <TextField
                            labelName="Challan date"
                            placeholder="Enter challan date"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            type="text"
                            name="challanDate"
                            value={values?.challanDate}
                          />
                        </div>
                        <div className="flex justify-between gap-10  py-2">
                          <TextField
                            labelName="Amount"
                            placeholder="Enter amount"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            type="text"
                            name="amount"
                            value={values?.amount}
                          />
                          <TextField
                            labelName="Status"
                            placeholder="Enter status"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            type="text"
                            name="status"
                            value={values?.status}
                          />
                          <TextField
                            labelName="Payment source "
                            placeholder="Enter payment source "
                            onBlur={handleBlur}
                            onChange={handleChange}
                            type="text"
                            name="paymentSource"
                            value={values?.paymentSource}
                          />
                        </div>
                        <div className="flex justify-between gap-10  py-2">
                          <div className="flex whitespace-nowrap gap-4 w-1/3">
                            <FormControlLabel
                              control={
                                <Switch
                                  checked={values?.challanPrint}
                                  onChange={(e) => {
                                    setFieldValue(
                                      'challanPrint',
                                      e.target.checked
                                    );
                                  }}
                                  name="challanPrint"
                                />
                              }
                              label="Challan print"
                            />
                            <FormControlLabel
                              control={
                                <Switch
                                  checked={values?.receipt}
                                  onChange={(e) => {
                                    setFieldValue('receipt', e.target.checked);
                                  }}
                                  name="receipt"
                                />
                              }
                              label="Receipt"
                            />
                          </div>
                          <TextField
                            labelName="Payment"
                            placeholder="Enter payment"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            type="text"
                            name="payment"
                            value={values?.payment}
                          />
                          <TextField
                            labelName="Payment verify"
                            placeholder="Enter payment verify "
                            onBlur={handleBlur}
                            onChange={handleChange}
                            type="text"
                            name="paymentVerify"
                            value={values?.paymentVerify}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Challan;
