<template>
  <div class="w-[40%] m-auto mt-[100px] content-main">
    <div class="border-b border-solid border-[#E5E7EB] pb-3 mb-7">
      <h3 class="font font-bold text-[24px]">世帯主</h3>
    </div>
    <div>
      <Form @submit="() => {}">
        <div class="flex items-center mb-6">
          <div class="w-[200px] text">氏名</div>
          <div class="flex w-[350px] justify-between">
            <div class="flex flex-col">
              <Field
                class="form-controls w-[166px]"
                id="surname"
                name="surname"
                rules="required"
                placeholder="例：鈴木"
              />
              <ErrorMessage name="surname" class="text-red-600" />
              <label class="text" for="surname">姓</label>
            </div>
            <div class="flex flex-col">
              <Field
                class="form-controls w-[166px]"
                id="givenname"
                name="givenname"
                rules="required"
                placeholder="例：太郎"
              />
              <ErrorMessage name="givenname" class="text-red-600" />
              <label class="text" for="givenname">名</label>
            </div>
          </div>
        </div>
        <div class="flex items-center">
          <div class="w-[200px] text">カナ氏名</div>
          <div class="flex w-[350px] justify-between">
            <div class="flex flex-col">
              <Field
                class="form-controls w-[166px]"
                id="surname"
                name="surname2"
                rules="required"
                placeholder="例：スズキ"
              />
              <ErrorMessage name="surname2" class="text-red-600" />
              <label class="text" for="surname">セイ</label>
            </div>
            <div class="flex flex-col">
              <Field
                class="form-controls w-[166px]"
                id="givenname"
                name="givenname1"
                rules="required"
                placeholder="例：タロウ"
              />
              <ErrorMessage name="givenname1" class="text-red-600" />
              <label class="text" for="givenname1">メイ</label>
            </div>
          </div>
        </div>
        <div class="flex">
          <div class="w-[200px] text">性別</div>
          <div class="flex">
            <div class="mr-[16px] flex items-center">
              <Field class="radio" name="gender" type="radio" value="男性" rules="radio" />
              <span class="text">男性</span>
            </div>
            <div class="mr-[16px] flex items-center">
              <Field class="radio" name="gender" type="radio" value="女性" rules="radio" />
              <span class="text">女性</span>
            </div>
            <div class="mr-[16px] flex items-center">
              <Field class="radio" name="gender" type="radio" value="その他" rules="radio" />
              <span class="text">その他</span>
            </div>
            <ErrorMessage name="gender" class="text-red-600" />
          </div>
        </div>
        <div class="flex">
          <div class="w-[200px] text">申請者</div>
          <div class="flex">
            <div class="mr-[16px] flex items-center">
              <Field class="radio" name="applicant" type="radio" value="本人" rules="radio" />
              <span class="text">本人</span>
            </div>
            <div class="mr-[16px] flex items-center">
              <Field class="radio" name="applicant" type="radio" value="代理人" rules="radio" />
              <span class="text">代理人</span>
            </div>
            <ErrorMessage name="applicant" class="text-red-600" />
          </div>
        </div>

        <div class="flex items-center">
          <div class="w-[200px] text">生年月日</div>
          <div class="flex">
            <div class="flex items-center mr-[16px]">
              <Field class="form-controls w-[80px] mr-[16px]" name="years" value="1970" />
              <span class="text">年</span>
            </div>
            <div class="flex items-center mr-[16px]">
              <Field class="form-controls w-[80px] mr-[16px]" name="months" value="01" />
              <span class="text">月</span>
            </div>
            <div class="flex items-center mr-[16px]">
              <Field class="form-controls w-[80px] mr-[16px]" name="days" value="01" />
              <span class="text">日</span>
            </div>
          </div>
        </div>

        <div class="flex items-center">
          <div class="w-[200px] text">郵便番号</div>
          <div>
            <div>
              <Field class="form-controls w-[80px] mr-[16px]" name="test1" />
              <span>-</span>
              <Field class="form-controls w-[120px] mr-[16px] ml-[16px]" name="test2" />
              <Field
                class="form-controls w-[200px] mr-[16px]"
                name="test3"
                value="郵便番号から住所を入力"
              />
            </div>
            <div>
              <a href="#" class="underline text-[blue] mt-2 block text-[14px]"
                >郵便番号がわからない方はこちら</a
              >
            </div>
          </div>
        </div>
        <div class="flex items-center">
          <div class="w-[200px] text">住所（都道府県）</div>
          <div class="grow">
            <Field class="form-controls w-full mr-[16px]" name="prefectures" rules="required" />
            <ErrorMessage name="prefectures" class="text-red-600" />
          </div>
        </div>
        <div class="flex items-center">
          <div class="w-[200px] text">住所（市区町村）</div>
          <div class="grow">
            <Field class="form-controls w-full mr-[16px]" name="municipalities" rules="required" />
            <ErrorMessage name="municipalities" class="text-red-600" />
          </div>
        </div>
        <div class="flex items-center">
          <div class="w-[200px] text">住所（番地）</div>
          <div class="grow">
            <Field class="form-controls w-full mr-[16px]" name="email" rules="required" />
            <ErrorMessage name="email" class="text-red-600" />
          </div>
        </div>
        <div class="flex items-center">
          <div class="w-[200px] text">住所（建物名・部屋番号等）</div>
          <div class="grow">
            <Field class="form-controls w-full mr-[16px]" name="phone" rules="required|email" />
            <ErrorMessage name="phone" class="text-red-600" />
          </div>
        </div>
        <div class="flex items-center">
          <div class="w-[200px] text">電話番号</div>
          <div class="grow">
            <Field class="form-controls w-[45%] mr-[16px]" name="phone-number" rules="required" />
            <ErrorMessage name="phone-number" class="text-red-600" />
          </div>
        </div>
        <button
          class="py-1 px-2 border border-solid rounded-md bg-sky-600 text-white"
          type="submit"
        >
          Submit
        </button>
      </Form>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, watch, reactive } from 'vue'
import { Field, Form, ErrorMessage } from 'vee-validate'
</script>

<style lang="scss" scoped>
.form-controls {
  padding: 8px 16px;
  height: 37px;
  border-radius: 8px;
  background: #f9fafb;
  border: 1px solid #d1d5db;
  margin-bottom: 8px;
  &::placeholder {
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 150%;
  }
}

.text {
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 150%;
}
.content-main {
  border: 1px solid #e5e7eb;
  box-shadow: 0px 4px 6px -1px rgba(0, 0, 0, 0.1), 0px 2px 4px -2px rgba(0, 0, 0, 0.05);
  border-radius: 8px;
  padding: 24px;
}
.radio {
  margin-right: 8px;
  width: 16px;
  height: 16px;
}
</style>
