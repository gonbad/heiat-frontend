<template>
    <div>
        <payments :payments="$parent.program.registration.payments"></payments>
    </div>
</template>

<script>
    import Payments from "../components/Payments";

    export default {
        components: {Payments},
        name: 'Program.Payments'
    }

</script>
