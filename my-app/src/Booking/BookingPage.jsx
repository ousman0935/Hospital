import { useState } from "react";
import { Card, CardContent } from "../components/Card";
import Button from "../components/Button";
import Input from "../components/Input";
import Select from "../components/Select";

export default function BookingPage() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [department, setDepartment] = useState("");
  const [doctor, setDoctor] = useState("");
  const [date, setDate] = useState("");

  const handleSubmit = () => {
    console.log({ name, phone, department, doctor, date });
    alert("Booking submitted!");
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100 p-4">
      <Card className="w-full max-w-xl">
        <CardContent>
          <h1 className="text-3xl font-bold mb-6 text-center">
            Book an Appointment
          </h1>

          <div className="space-y-4">

            <Input
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <Input
              placeholder="Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />

            <Select value={department} onChange={(e) => setDepartment(e.target.value)}>
              <option value="">Select Department</option>
              <option value="cardiology">Cardiology</option>
              <option value="orthopedics">Orthopedics</option>
              <option value="neurology">Neurology</option>
            </Select>

            <Select value={doctor} onChange={(e) => setDoctor(e.target.value)}>
              <option value="">Select Doctor</option>
              <option value="dr_ali">Dr. Ali</option>
              <option value="dr_sara">Dr. Sara</option>
              <option value="dr_yonas">Dr. Yonas</option>
            </Select>

            <Input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />

            <Button onClick={handleSubmit}>Confirm Booking</Button>

          </div>
        </CardContent>
      </Card>
    </div>
  );
}