---
component: form-stripe
---

```svelte
<script>
  import { Form } from "bubbles-ui";
  import { validateInputs, getFormData, showToast, showLoading, hideLoading } from "bubbles-ui";

  const stripeFormInputs = [
    {
      type: "select",
      id: "payment_method",
      label: "Select Payment Method",
      error: "Select a payment method",
      value: "token_1234",
      options: [
        {
          label: "Visa ···· 1234 (default)",
          value: "token_1234",
          caption: "Expires: 11/26",
        },
        {
          label: "Mastercard ···· 5678",
          value: "token_5678",
          caption: "Expires: 11/26",
        },
        {
          label: "Amex ···· 9012",
          value: "token_9012",
          caption: "Expires: 11/26",
        },
        "break",
        {
          label: "Add New Card",
          value: "",
        },
      ],
    },
    {
      type: "text",
      id: "cardholder_name",
      label: "Cardholder Name",
      error: "Cardholder name is required",
      validation: "string|required",
      hidden_unless: [{ id: "payment_method", value: "" }],
    },
    {
      type: "stripe-card",
      id: "stripe_card_token",
      hidden_unless: [{ id: "payment_method", value: "" }],
      stripe_key_name: "VITE_STRIPE_PUBLIC_KEY",
      stripe_token_values: {
        name: "cardholder_name",
      },
    },
    {
      type: "checkbox",
      id: "save_card",
      value: null,
      label: "Save Card Information",
      desc: "If you check this box, we'll save this card to yur profile and you'll see it as a dropdown in the future.",
      hidden_unless: [{ id: "payment_method", value: "" }],
    },
    {
      type: "button",
      label: "Purchase for $9.99",
      onsubmit: async (event) => {
        const button_id = event.currentTarget.id;

        showLoading(button_id);

        try {
          await validateInputs(stripeFormInputs);
          const data = await getFormData(stripeFormInputs);
          console.log(data);
        } catch (error) {
          showToast(error.message);
        } finally {
          hideLoading(button_id);
        }
      },
    },
  ];
</script>

<Form inputs={stripeFormInputs} />
```
