import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { useRef } from 'react';
import { sendData } from '../helpers/calls';
import { showNoti, updateNoti } from '../helpers/notifications';

function Form() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm();

  const type = useRef({});
  type.current = watch('type', '');

  const onSubmit = async (data) => {
    showNoti('Adding dish', 'We are adding your dish', true);
    const dishData = {
      name: data.name,
      preparation_time: data.preparation_time,
      type: data.type,
      ...(data.type === 'pizza' && { no_of_slices: +data.no_of_slices, diameter: +data.diameter }),
      ...(data.type === 'soup' && { spiciness_scale: +data.spiciness_scale }),
      ...(data.type === 'sandwich' && { slices_of_bread: +data.slices_of_bread }),
    };
    const response = await sendData(dishData);
    if (response.status === 200) {
      reset();
      updateNoti('Dish added', 'We successfully added your dish', true);
    } else {
      const data = await response.json();
      updateNoti('Something went wrong!', data.type, false);
    }
  };

  return (
    <FormWrapper onSubmit={handleSubmit(onSubmit)}>
      <InputWrapper>
        <Label>Name</Label>
        <Input type="name" placeholder="Name of dish" {...register('name', { required: true })} />
      </InputWrapper>
      <InputWrapper>
        <Label>Preparation time</Label>
        <Input
          type="time"
          placeholder="Name of dish"
          step={1}
          {...register('preparation_time', { required: true })}
        />
      </InputWrapper>
      <InputWrapper>
        <Label>Dish type</Label>
        <Select defaultValue="none" {...register('type', { required: true })}>
          <option value="none" disabled hidden>
            Select dish type
          </option>
          <option value="pizza">Pizza</option>
          <option value="soup">Soup</option>
          <option value="sandwich">Sandwich</option>
        </Select>
      </InputWrapper>
      {type.current === 'pizza' && (
        <>
          <InputWrapper>
            <Label>Number of slices</Label>
            <Input
              type="number"
              placeholder="Number of slices"
              min={0}
              {...register('no_of_slices', { required: true })}
            />
          </InputWrapper>
          <InputWrapper>
            <Label>Diameter</Label>
            <Input
              type="number"
              placeholder="Diameter"
              min={0}
              step="0.01"
              {...register('diameter', { required: true })}
            />
          </InputWrapper>
        </>
      )}
      {type.current === 'soup' && (
        <InputWrapper>
          <Label>Spiciness scale (1-10)</Label>
          <Input
            type="number"
            placeholder="Spiciness scale"
            min={0}
            max={10}
            {...register('spiciness_scale', { required: true })}
          />
        </InputWrapper>
      )}
      {type.current === 'sandwich' && (
        <InputWrapper>
          <Label>Slices of bread</Label>
          <Input
            type="number"
            placeholder="Slices of bread"
            min={0}
            {...register('slices_of_bread', { required: true })}
          />
        </InputWrapper>
      )}
      <Button type="submit">Sumbit</Button>
    </FormWrapper>
  );
}
export default Form;

const FormWrapper = styled.form`
  display: flex;
  flex-direction: column;
  row-gap: 0.5rem;
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  font-weight: 400;
  font-size: 0.8rem;
  &::after {
    content: ' *';
    color: red;
  }
`;
const Select = styled.select`
  cursor: pointer;
  border: 1px solid #ced4da;
  border-radius: 6px;
  height: 2rem;
  padding: 0 0.5rem;
  transition: all 150ms ease-out;
  font-family: Inter;
  &:focus {
    outline: none;
    border: 0.5px solid rgba(28, 199, 56, 1);
  }
`;

const Input = styled.input`
  border: 1px solid #ced4da;
  border-radius: 6px;
  height: 1rem;
  width: 20rem;
  padding: 0.5rem;
  transition: all 150ms ease-out;
  font-family: Inter;
  &:focus {
    outline: none;
    border: 0.5px solid rgba(28, 199, 56, 1);
  }
  @media (max-width: 40rem) {
    width: 15rem;
  }
`;

const Button = styled.button`
  margin-top: 1rem;
  padding: 1.3em 3em;
  font-size: 12px;
  font-family: Inter;
  text-transform: uppercase;
  letter-spacing: 2.5px;
  font-weight: 500;
  color: #fff;
  background-color: #191919;
  border: none;
  border-radius: 45px;
  box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease 0s;
  cursor: pointer;
  outline: none;
  &:hover {
    background-color: rgba(28, 199, 56, 1);
    box-shadow: 0px 15px 20px rgba(28, 199, 56, 0.4);
    color: #fff;
    transform: translateY(-7px);
  }
  &:active {
    transform: translateY(-1px);
  }
`;
