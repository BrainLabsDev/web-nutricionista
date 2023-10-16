<template>
  <div>
    <div id="paypal-button-container"></div>
  </div>
</template>

<script setup lang="ts">
import { userDataServices } from 'src/services/userDataService'
import { onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()

const props = defineProps(['amountPay', 'formulario', 'id'])

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
        return actions.order.capture().then(async function (details) {
          const existUser = await userDataServices.checkUser(
            props.formulario.email
          )
          if (existUser.data === null) {
            const dataUser = {
              nombre: props.formulario.nombre,
              apellido_paterno: props.formulario.apellido_paterno,
              apellido_materno: props.formulario.apellido_materno,
              email: props.formulario.email,
              telefono: props.formulario.telefono,
              periodo_id: String(props.id),
              metodo_pago: 'paypal'
            }

            await userDataServices.createUser(dataUser)
            router.push({ name: 'Success' })
          } else {
            const dataUser = {
              ...existUser.data,
              periodo_id: String(props.id)
            }

            await userDataServices.updateUser(dataUser, existUser.data.id)
            router.push({ name: 'SuccessExist' })
          }

          // Aquí puedes realizar acciones adicionales después de que se apruebe el pago
        })
      }
    })
    .render('#paypal-button-container')
})
</script>
