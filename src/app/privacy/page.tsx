'use client'

import Link from 'next/link'
import { ArrowLeft, Home } from 'lucide-react'

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white py-12">
      <div className="container mx-auto px-6 max-w-4xl">
        {/* Кнопка возврата вверху */}
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center space-x-2 bg-zinc-900 text-white px-6 py-3 rounded-full hover:bg-zinc-800 transition-colors duration-200"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Вернуться на сайт</span>
          </Link>
        </div>

        <h1 className="text-4xl font-bold text-zinc-900 mb-8 text-center">
          Политика конфиденциальности
        </h1>

        <div className="space-y-8">
          <section>
            <h2 className="text-2xl font-semibold text-zinc-900 mb-4">
              1. Общие положения
            </h2>
            <p className="leading-relaxed text-zinc-700">
              Настоящая Политика конфиденциальности (далее — «Политика») регулирует порядок обработки
              персональных данных пользователей сайта компании «MAESTRO» (далее — «Компания»),
              осуществляющей деятельность по изготовлению мебели на заказ на территории Республики Беларусь.
            </p>
            <p className="leading-relaxed mt-4 text-zinc-700">
              Используя данный сайт, вы соглашаетесь с условиями настоящей Политики конфиденциальности.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-zinc-900 mb-4">
              2. Контактная информация
            </h2>
            <div className="bg-zinc-50 p-6 rounded-lg">
              <p className="text-zinc-700"><strong>Адрес:</strong> г. Минск, ул. Судмалиса, 13</p>
              <p className="text-zinc-700"><strong>Телефон:</strong> +375291565232</p>
              <p className="text-zinc-700"><strong>Email:</strong> mebelkdomy.by@gmail.com</p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-zinc-900 mb-4">
              3. Какие данные мы собираем
            </h2>
            <p className="leading-relaxed mb-4 text-zinc-700">
              При использовании нашего сайта мы можем собирать следующую информацию:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4 text-zinc-700">
              <li>Имя (при заполнении форм обратной связи)</li>
              <li>Номер телефона (для связи с вами)</li>
              <li>Комментарии и пожелания (по желанию)</li>
              <li>Техническая информация (IP-адрес, тип браузера, время посещения)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-zinc-900 mb-4">
              4. Цели обработки персональных данных
            </h2>
            <p className="leading-relaxed mb-4 text-zinc-700">
              Мы используем ваши персональные данные для:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4 text-zinc-700">
              <li>Связи с вами для предоставления консультаций</li>
              <li>Обработки заказов на изготовление мебели</li>
              <li>Предоставления информации о наших услугах</li>
              <li>Улучшения качества обслуживания</li>
              <li>Выполнения договорных обязательств</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-zinc-900 mb-4">
              5. Правовые основания обработки
            </h2>
            <p className="leading-relaxed text-zinc-700">
              Обработка персональных данных осуществляется на основании:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4 mt-4 text-zinc-700">
              <li>Согласия субъекта персональных данных</li>
              <li>Исполнения договора, стороной которого является субъект персональных данных</li>
              <li>Законных интересов оператора персональных данных</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-zinc-900 mb-4">
              6. Передача данных третьим лицам
            </h2>
            <p className="leading-relaxed text-zinc-700">
              Мы не передаем ваши персональные данные третьим лицам без вашего согласия,
              за исключением случаев, предусмотренных законодательством Республики Беларусь.
            </p>
            <p className="leading-relaxed mt-4 text-zinc-700">
              Мы можем использовать сервисы аналитики (например, Google Analytics) для улучшения
              работы сайта. Эти сервисы могут собирать анонимную статистическую информацию.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-zinc-900 mb-4">
              7. Хранение персональных данных
            </h2>
            <p className="leading-relaxed text-zinc-700">
              Персональные данные хранятся не дольше, чем это необходимо для достижения
              целей их обработки, но не более 3 лет с момента последнего обращения,
              если иное не предусмотрено законодательством.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-zinc-900 mb-4">
              8. Ваши права
            </h2>
            <p className="leading-relaxed mb-4 text-zinc-700">
              В соответствии с законодательством Республики Беларусь вы имеете право:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4 text-zinc-700">
              <li>Получать информацию о обработке ваших персональных данных</li>
              <li>Требовать уточнения, изменения или удаления ваших данных</li>
              <li>Отзывать согласие на обработку персональных данных</li>
              <li>Обращаться с жалобами в уполномоченные органы</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-zinc-900 mb-4">
              9. Безопасность данных
            </h2>
            <p className="leading-relaxed text-zinc-700">
              Мы принимаем необходимые технические и организационные меры для защиты
              ваших персональных данных от несанкционированного доступа, изменения,
              раскрытия или уничтожения.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-zinc-900 mb-4">
              10. Cookies (файлы cookie)
            </h2>
            <p className="leading-relaxed text-zinc-700">
              Наш сайт использует файлы cookie для улучшения пользовательского опыта
              и аналитики. Вы можете настроить свой браузер для отклонения файлов cookie,
              однако это может повлиять на функциональность сайта.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-zinc-900 mb-4">
              11. Изменения в Политике
            </h2>
            <p className="leading-relaxed text-zinc-700">
              Мы оставляем за собой право вносить изменения в настоящую Политику.
              Актуальная версия всегда доступна на данной странице. Существенные
              изменения будут доведены до вашего сведения.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-zinc-900 mb-4">
              12. Контакты для обращений
            </h2>
            <div className="bg-zinc-50 p-6 rounded-lg">
              <p className="leading-relaxed mb-4 text-zinc-700">
                По всем вопросам, связанным с обработкой персональных данных,
                вы можете обратиться к нам:
              </p>
              <p className="text-zinc-700"><strong>Email:</strong> mebelkdomy.by@gmail.com</p>
              <p className="text-zinc-700"><strong>Телефон:</strong> +375291565232</p>
              <p className="text-zinc-700"><strong>Адрес:</strong> г. Минск, ул. Судмалиса, 13</p>
            </div>
          </section>

          <div className="border-t border-zinc-200 pt-8 mt-12 text-center">
            <p className="text-sm text-zinc-500">
              Дата последнего обновления: 3 июня 2025 года
            </p>
          </div>
        </div>

        {/* Кнопка возврата внизу */}
        <div className="mt-12 text-center">
          <Link
            href="/"
            className="inline-flex items-center space-x-2 bg-zinc-900 text-white px-8 py-4 rounded-full hover:bg-zinc-800 transition-colors duration-200 text-lg"
          >
            <Home className="w-6 h-6" />
            <span>Вернуться на главную</span>
          </Link>
        </div>
      </div>
    </div>
  )
}
