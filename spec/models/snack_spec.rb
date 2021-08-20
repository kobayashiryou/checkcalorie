require "rails_helper"

RSpec.describe Snack, type: :model do
  describe "validation check" do
    subject{ snack.valid? }
    let!(:user){ create(:user) }
    let!(:food){ create(:food) }
    let(:snack){ build(:snack, date: date, user: user, food: food) }
    let(:date){ Faker::Date.between(from: '2020-1-1', to: '2021-08-25') }
    context "dateが入力されている場合" do
      it "作成される" do
        expect(subject).to eq true
      end
    end

    context "dateが入力されていない時" do
      let(:date){ nil }
      it "エラーする" do
        subject
        expect(snack.errors.messages[:date]).to include "can't be blank"
      end
    end
  end
end
