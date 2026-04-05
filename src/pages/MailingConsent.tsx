import { useEffect } from 'react';
import { useLanguage } from '../LanguageContext';
import SEO from '../components/SEO';

const MailingConsent = () => {
  const { language } = useLanguage();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-royal-black text-white pt-32 pb-20">
      <SEO title={language === 'ru' ? 'Согласие на рассылку | Royal Event Group' : 'Mailing Consent | Royal Event Group'} />
      <div className="max-w-4xl mx-auto px-6">
        <h1 className="text-3xl sm:text-5xl font-display font-black uppercase tracking-tighter leading-none mb-12">
          {language === 'ru' ? 'Согласие на получение информационных и рекламных материалов' : 'Consent to Receive Informational and Promotional Materials'}
        </h1>

        <div className="prose prose-invert prose-lg max-w-none space-y-8 text-white/70 leading-relaxed">
          {language === 'ru' ? (
            <>
              <p>
                Физическое лицо (далее — «Пользователь»), начиная использовать сайт, расположенный по адресу{' '}
                <a href="https://www.royaleventandmice.com" className="text-royal-pink hover:underline">https://www.royaleventandmice.com</a>{' '}
                (далее — «Сайт»), а также предоставляя свои персональные данные, выражает добровольное, осознанное и конкретное согласие на получение информационных и рекламных сообщений от Индивидуального предпринимателя Усачевой Ксении Олеговны (ИНН 772206846997, ОГРНИП 324774600436282), адрес регистрации: г. Москва, ул. Шепелюгинская, д. 5, к. 1, кв. 91 (далее — «Оператор»), включая следующие условия:
              </p>

              <section>
                <h2 className="text-xl font-display font-bold text-white uppercase tracking-tight mb-4">1. Цель рассылки</h2>
                <p>Настоящее согласие предоставляется на получение сообщений, содержащих:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>информацию о новых возможностях и функциях Сайта;</li>
                  <li>уведомления о специальных предложениях, акциях, бонусных программах, мероприятиях и новостях Оператора;</li>
                  <li>напоминания и уведомления в рамках использования Сайта.</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-display font-bold text-white uppercase tracking-tight mb-4">2. Способы рассылки</h2>
                <p>Рассылка может осуществляться с использованием следующих каналов на контактные данные, предоставленные Пользователем:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>электронной почты (e-mail);</li>
                  <li>SMS-сообщений и мессенджеров (WhatsApp, Telegram и др.);</li>
                  <li>push-уведомлений на сайте или через браузер (если применимо).</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-display font-bold text-white uppercase tracking-tight mb-4">3. Условия</h2>
                <p>3.1. Сообщения могут содержать рекламную информацию и направляться не чаще, чем это необходимо для целей, указанных в п. 1 настоящего согласия.</p>
                <p>3.2. Согласие предоставляется на неопределённый срок, действует до момента его отзыва.</p>
                <p>3.3. Пользователь вправе в любой момент отказаться от получения рассылок, воспользовавшись:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>ссылкой «отписаться» в письме (если доступно);</li>
                  <li>либо направив письменный отказ на e-mail Оператора: <a href="mailto:baxgat@yandex.ru" className="text-royal-pink hover:underline">baxgat@yandex.ru</a>.</li>
                </ul>
                <p>3.4. Оператор обязуется прекратить направление рекламных сообщений в течение 3 (трёх) рабочих дней с момента получения отзыва Пользователя.</p>
              </section>

              <section>
                <h2 className="text-xl font-display font-bold text-white uppercase tracking-tight mb-4">4. Подтверждение согласия</h2>
                <p>Согласие считается предоставленным в момент совершения Пользователем одного из следующих подтверждающих действий:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>проставление отметки в специальном поле (чекбоксе) с текстом «Согласен(-на) получать рекламные и информационные рассылки» и последующее подтверждение действия (отправка формы);</li>
                  <li>нажатие отдельной кнопки «Подписаться на рассылку» после ознакомления с условиями настоящего Согласия;</li>
                  <li>совершение иного действия, прямо свидетельствующего о волеизъявлении на получение рекламных сообщений от Оператора.</li>
                </ul>
              </section>
            </>
          ) : (
            <>
              <p>
                An individual (hereinafter — the "User"), upon starting to use the website located at{' '}
                <a href="https://www.royaleventandmice.com" className="text-royal-pink hover:underline">https://www.royaleventandmice.com</a>{' '}
                (hereinafter — the "Website"), as well as by providing personal data, voluntarily, consciously, and specifically consents to receiving informational and promotional messages from Individual Entrepreneur Usacheva Ksenia Olegovna (INN 772206846997, OGRNIP 324774600436282), registered address: Moscow, Shepelyuginskaya st., 5, bldg. 1, apt. 91 (hereinafter — the "Operator"), including the following terms:
              </p>

              <section>
                <h2 className="text-xl font-display font-bold text-white uppercase tracking-tight mb-4">1. Purpose of Mailing</h2>
                <p>This consent is granted for receiving messages containing:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>information about new features and functions of the Website;</li>
                  <li>notifications about special offers, promotions, loyalty programs, events, and news from the Operator;</li>
                  <li>reminders and notifications within the scope of using the Website.</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-display font-bold text-white uppercase tracking-tight mb-4">2. Mailing Methods</h2>
                <p>Mailings may be sent using the following channels to the contact information provided by the User:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>email;</li>
                  <li>SMS messages and messengers (WhatsApp, Telegram, etc.);</li>
                  <li>push notifications on the website or via browser (if applicable).</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-display font-bold text-white uppercase tracking-tight mb-4">3. Terms</h2>
                <p>3.1. Messages may contain promotional information and shall be sent no more frequently than necessary for the purposes specified in Section 1 of this consent.</p>
                <p>3.2. Consent is granted for an indefinite period and remains in effect until revoked.</p>
                <p>3.3. The User may opt out of receiving mailings at any time by:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>using the "unsubscribe" link in the email (if available);</li>
                  <li>or sending a written opt-out request to the Operator's email: <a href="mailto:baxgat@yandex.ru" className="text-royal-pink hover:underline">baxgat@yandex.ru</a>.</li>
                </ul>
                <p>3.4. The Operator undertakes to cease sending promotional messages within 3 (three) business days from receiving the User's revocation.</p>
              </section>

              <section>
                <h2 className="text-xl font-display font-bold text-white uppercase tracking-tight mb-4">4. Confirmation of Consent</h2>
                <p>Consent is deemed granted at the moment the User performs one of the following confirming actions:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>checking the box with the text "I agree to receive promotional and informational mailings" and subsequently confirming the action (submitting the form);</li>
                  <li>clicking the "Subscribe to mailing list" button after reviewing the terms of this Consent;</li>
                  <li>performing any other action directly indicating the intent to receive promotional messages from the Operator.</li>
                </ul>
              </section>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default MailingConsent;
