import React, { useEffect, useState } from "react";
import { SidePanel } from "@/components/AddFormLayout/AddFormLayout";
import DeviceCard from "@/components/DeviceCard";

const Device = ({ values, setFieldValue,errors }) => {
  const [forms, setForms] = useState([{ showForm: false }]);

  const handleAddForm = (index) => {
    const newForms = [...forms];
    newForms[index].showForm = true;
    newForms.push({ showForm: false });
    setForms(newForms);
  };

  const handleDeleteCard = (indexToDelete) => {
    setForms(forms.filter((_, index) => index !== indexToDelete));
    setFieldValue(
      "device",
      values.device.filter((_, index) => index !== indexToDelete)
    );
  };
  useEffect(() => {
    if (values?.device) {
      const newForms = [...values?.device];
      const updateShow = newForms.map((item, index) => ({
        ...item,
        showForm: true,
      }));

      updateShow.push({ showForm: false });
      setForms(updateShow);
    }
  }, []);

  return (
    <div className='border-v add-v-form-section w100 add-edit-user-card'>
      <SidePanel title="Device" description="Manage device in this vehicle" />
      <div className="w-full h-full">
        <div className="grid grid-cols-2 gap-4">
          {forms.map((form, index) => (
            <div key={index}>
              {form.showForm ? (
                <DeviceCard
                  values={values}
                  setFieldValue={setFieldValue}
                  counter={index}
                  onDelete={() => handleDeleteCard(index)}
                  errors={errors}
                  
                />
              ) : (
                <div
                  className="border border-gray-secondary border-dotted rounded-md cursor-pointer min-h-[300px] bg-white shadow-sm h-full flex items-center justify-center"
                  onClick={() => handleAddForm(index)}
                >
                  <span className="text-6xl">+</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Device;
