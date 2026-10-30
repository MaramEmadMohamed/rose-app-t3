import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Field } from "@/components/ui/field";
import { SearchInput } from "@/components/ui/search-input";
import { FileInput } from "@/components/ui/file-input";
import { PhoneInput } from "@/components/ui/phone-input";
import React from "react";
import { PasswordInput } from "@/components/ui/password-input";
import { OtpInput } from "@/components/ui/input-otp";
function InputInstances() {
  const [phone, setPhone] = React.useState<string | undefined>();
  const [code, setCode] = React.useState("");
  const [dark, setDark] = React.useState(false);
  React.useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);
  return (
    <main className="mx-auto grid max-w-sm gap-6 p-10">
      <button
        type="button"
        onClick={() => setDark((d) => !d)}
        className="rounded-lg border px-3 py-2 text-sm"
      >
        Mode: {dark ? "Dark" : "Light"}
      </button>
      <Field>
        <Label htmlFor="a">Default</Label>
        <Input id="a" placeholder="Placeholder" />
      </Field>

      <Field>
        <Label htmlFor="b">Filled</Label>
        <Input id="b" defaultValue="Input text" />
      </Field>

      <Field invalid>
        <Label htmlFor="c">Error</Label>
        <Input id="c" placeholder="Placeholder" aria-invalid />
      </Field>

      <Field disabled>
        <Label htmlFor="d">Disabled</Label>
        <Input id="d" placeholder="Placeholder" disabled />
      </Field>

      <Field>
        <Label htmlFor="s1">Search</Label>
        <SearchInput id="s1" placeholder="Search..." />
      </Field>
      <Field>
        <Label htmlFor="s2">With text</Label>
        <SearchInput id="s2" defaultValue="Search text" />
      </Field>
      <Field invalid>
        <Label htmlFor="s3">Error</Label>
        <SearchInput id="s3" placeholder="Search..." aria-invalid />
      </Field>
      <Field disabled>
        <Label htmlFor="s4">Disabled</Label>
        <SearchInput id="s4" placeholder="Search..." disabled />
      </Field>
      <Field>
        <Label htmlFor="n1">Number</Label>
        <Input id="n1" type="number" placeholder="Placeholder" />
      </Field>
      <Field>
        <Label htmlFor="f1">Default</Label>
        <FileInput id="f1" />
      </Field>

      <Field invalid>
        <Label htmlFor="f2">Error</Label>
        <FileInput id="f2" aria-invalid />
      </Field>

      <Field disabled>
        <Label htmlFor="f3">Disabled</Label>
        <FileInput id="f3" disabled />
      </Field>

      <Field>
        <Label htmlFor="f4">Review current image</Label>
        <FileInput
          id="f4"
          reviewLabel="Review current image(s)"
          onReview={() => alert("open preview")}
        />
      </Field>
      <Field>
        <Label htmlFor="pw1">Default</Label>
        <PasswordInput id="pw1" placeholder="Enter Your password" />
      </Field>

      <Field>
        <Label htmlFor="pw2">Filled</Label>
        <PasswordInput id="pw2" defaultValue="12345678" />
      </Field>

      <Field invalid>
        <Label htmlFor="pw3">Error</Label>
        <PasswordInput
          id="pw3"
          placeholder="Enter Your password"
          aria-invalid
        />
      </Field>

      <Field disabled>
        <Label htmlFor="pw4">Disabled</Label>
        <PasswordInput id="pw4" placeholder="Enter Your password" disabled />
      </Field>

      <h2 className="mt-6 text-lg font-semibold">Phone</h2>

      <Field>
        <Label htmlFor="ph1">Default</Label>
        <PhoneInput id="ph1" value={phone} onChange={(v) => setPhone(v)} />
      </Field>

      <Field invalid>
        <Label htmlFor="ph2">Error</Label>
        <PhoneInput id="ph2" aria-invalid />
      </Field>

      <Field disabled>
        <Label htmlFor="ph3">Disabled</Label>
        <PhoneInput id="ph3" disabled />
      </Field>

      <Field>
        <Label htmlFor="otp1">Default</Label>
        <OtpInput id="otp1" value={code} onChange={setCode} />
      </Field>

      <Field invalid>
        <Label htmlFor="otp2">Error</Label>
        <OtpInput id="otp2" invalid />
      </Field>

      <Field disabled>
        <Label htmlFor="otp3">Disabled</Label>
        <OtpInput id="otp3" disabled value="1" />
      </Field>
    </main>
  );
}

export default InputInstances;
