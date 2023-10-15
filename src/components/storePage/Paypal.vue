<template>
  <div>
    <div id="paypal-button-container"></div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()

const props = defineProps(['amountPay'])

onMounted(() => {
  //@ts-ignore
  paypal
    .Buttons({
      style: {
        layout: 'vertical',
        color: 'gold',
        shape: 'rect',
        label: 'paypal'
      },
      createOrder: function (data, actions) {
        return actions.order.create({
          purchase_units: [
            {
              amount: {
                value: props.amountPay // El monto del pago
              }
            }
          ]
        })
      },
      onApprove: function (data, actions) {
        return actions.order.capture().then(function (details) {
          console.log(details)
          router.push({ name: 'Success' })
          // Aquí puedes realizar acciones adicionales después de que se apruebe el pago
        })
      }
    })
    .render('#paypal-button-container')
})
</script>
