<template>
    <div class="container">
        <b-card>
            <b-card-title>
                راهنمای وضعیت‌های موجود در سایت
            </b-card-title>

            <b-card-text>

                <div class="qa">
                    <div class="question-item">
                        قطعی
                    </div>
                    <div class="answer-item">
                        شما مجاز به شرکت در برنامه شده‌اید و لازم است تا هرچه سریعتر برای پرداخت هزینه‌ی برنامه
                        اقدام
                        نمایید.
                    </div>
                    <hr>
                </div>


                <div class="qa">
                    <div class="question-item">
                        رزرو
                    </div>
                    <div class="answer-item">
                        شما در این مرحله از قرعه کشی مجاز به شرکت در برنامه نشده اید. لطفا منتظر مراحل بعدی قرعه
                        کشی بمانید.
                    </div>
                    <hr>
                </div>


                <div class="qa">
                    <div class="question-item">
                        معلق
                    </div>
                    <div class="answer-item">
                        شما مجاز به شرکت در برنامه شده اید اما تا پایان مهلت مقرر نسبت به پرداخت هزینه‌ی خود
                        اقدام نکرده اید و فعلا توسط مسئولین برنامه معلق شده‌اید.
                    </div>
                    <hr>
                </div>

                <div class="qa">
                    <div class="question-item">
                        موقت
                    </div>
                    <div class="answer-item">
                        وضعیت تحصیلی شما در پروفایلتان درست مشخص نشده است، یا شرکت در این برنامه برای شما امکان‌پذیر
                        نیست. (مثلا مخصوص دانشجویان می‌باشد). درصورت عدم صحبت اطلاعات، هرچه سریعتر اطلاعات خود را اصلاح
                        کرده و مسئولین برنامه را مطلع نمایید.
                    </div>
                </div>

            </b-card-text>
        </b-card>
    </div>
</template>

<script>
    export default {
        name: 'About',
    }
</script>
<style>
    .question-item {
        font-weight: bold;
    }
</style>