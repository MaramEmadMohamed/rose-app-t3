import { notFound } from "next/navigation";

import { Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { OtpInput } from "@/components/ui/input-otp";
import { Label } from "@/components/ui/label";

// Dev-only strings: replace with translations once messages exist
const DEV_LABELS = {
  upload: "Upload file",
  review: "Review current image(s)",
  clear: "Clear search",
  showPassword: "Show password",
  hidePassword: "Hide password",
  increase: "Increase",
  decrease: "Decrease",
  country: "Country",
  searchCountry: "Search country",
  noCountry: "No country found",
};

function InputShowcase({ mode }: { mode: string }) {
  const id = (name: string) => `${mode}-${name}`;

  return (
    <div className="grid max-w-sm gap-5">
      <Field>
        <Label htmlFor={id("text")}>Text</Label>
        <Input id={id("text")} placeholder="Placeholder" />
      </Field>
      <Field invalid>
        <Label htmlFor={id("text-error")}>Text error</Label>
        <Input id={id("text-error")} placeholder="Placeholder" aria-invalid />
      </Field>
      <Field disabled>
        <Label htmlFor={id("text-disabled")}>Text disabled</Label>
        <Input id={id("text-disabled")} placeholder="Placeholder" disabled />
      </Field>

      <Field>
        <Label htmlFor={id("number")}>Number</Label>
        <Input
          id={id("number")}
          type="number"
          placeholder="Placeholder"
          min={0}
          max={10}
          increaseLabel={DEV_LABELS.increase}
          decreaseLabel={DEV_LABELS.decrease}
        />
      </Field>

      <Field>
        <Label htmlFor={id("password")}>Password</Label>
        <Input
          id={id("password")}
          type="password"
          placeholder="********"
          showPasswordLabel={DEV_LABELS.showPassword}
          hidePasswordLabel={DEV_LABELS.hidePassword}
        />
      </Field>

      <Field>
        <Label htmlFor={id("search")}>Search</Label>
        <Input
          id={id("search")}
          type="search"
          placeholder="Search..."
          clearLabel={DEV_LABELS.clear}
        />
      </Field>

      <Field>
        <Label htmlFor={id("file")}>File</Label>
        <Input id={id("file")} type="file" uploadLabel={DEV_LABELS.upload} />
      </Field>
      <Field>
        <Label htmlFor={id("file-review")}>File with current image</Label>
        <Input
          id={id("file-review")}
          type="file"
          uploadLabel={DEV_LABELS.upload}
          reviewLabel={DEV_LABELS.review}
        />
      </Field>

      <Field>
        <Label htmlFor={id("phone")}>Phone</Label>
        <Input
          id={id("phone")}
          type="tel"
          placeholder="Phone number"
          countryLabel={DEV_LABELS.country}
          searchCountryLabel={DEV_LABELS.searchCountry}
          noCountryLabel={DEV_LABELS.noCountry}
        />
      </Field>

      <Field>
        <Label htmlFor={id("otp")}>OTP</Label>
        <OtpInput id={id("otp")} />
      </Field>
      <Field invalid>
        <Label htmlFor={id("otp-error")}>OTP error</Label>
        <OtpInput id={id("otp-error")} invalid />
      </Field>
      <Field disabled>
        <Label htmlFor={id("otp-disabled")}>OTP disabled</Label>
        <OtpInput id={id("otp-disabled")} disabled />
      </Field>
    </div>
  );
}

export default function InputsDevPage() {
  if (process.env.NODE_ENV === "production") notFound();

  return (
    <main className="grid lg:grid-cols-2">
      <section className="bg-background p-8 text-foreground">
        <h2 className="mb-6 text-lg font-semibold">Light</h2>
        <InputShowcase mode="light" />
      </section>
      <section className="dark bg-background p-8 text-foreground">
        <h2 className="mb-6 text-lg font-semibold">Dark</h2>
        <InputShowcase mode="dark" />
      </section>
    </main>
  );
}
