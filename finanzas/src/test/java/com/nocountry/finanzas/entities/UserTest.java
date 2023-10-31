package com.nocountry.finanzas.entities;

import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
public class UserTest {

    private User user;

    private Egress egress;

    private Income income;
/*
    @BeforeEach
    public void setUp() {
        user = new User();
        user.setName("name");
        user.setLast_name("last name");
        user.setEmail("example@example.com");
        user.setPassword("password");
        user.setBirthday_date(LocalDate.of(1998, 5, 22));

        EgressCategory category = new EgressCategory(CategoryEnum.ALIMENTACION);
        LocalDate date = LocalDate.of(2023, 10, 24);
        egress = new Egress(1000.0 , date, category);

        LocalDate dateIncome = LocalDate.of(2023, 10, 24);
        income = new Income(2L, 1000.0 , date, "description", null, null);
    }

    @AfterEach
    public void tearDown() {
        user = null;

        egress = null;

        income = null;
    }

    @Test
    public void defaultConstructorTest() {
        User userDefault = new User();

        assertNotNull(userDefault);

        assertNull(userDefault.getId());
        assertNull(userDefault.getName());
        assertNull(userDefault.getLast_name());
        assertNull(userDefault.getEmail());
        assertNull(userDefault.getPassword());
        assertNull(userDefault.getBirthday_date());
    }

    @Test
    public void getterTest() {
        assertNotNull(user);
        assertNull(user.getId());

        assertEquals("name", user.getName());
        assertEquals("last name", user.getLast_name());
        assertEquals("example@example.com", user.getEmail());
        assertEquals("password", user.getPassword());
        assertEquals(22, user.getBirthday_date().getDayOfMonth());
        assertEquals(5, user.getBirthday_date().getMonthValue());
        assertEquals(1998, user.getBirthday_date().getYear());
    }

    @Test
    public void setterTest() {
        LocalDate newBirthdayDate = LocalDate.of(1968, 5, 18);

        user.setName("new name");
        user.setLast_name("new last name");
        user.setEmail("newexample@example.com");
        user.setPassword("newPassword");
        user.setBirthday_date(newBirthdayDate);

        assertEquals("new name", user.getName());
        assertEquals("new last name", user.getLast_name());
        assertEquals("newexample@example.com", user.getEmail());
        assertEquals("newPassword", user.getPassword());
        assertEquals(18, user.getBirthday_date().getDayOfMonth());
        assertEquals(5, user.getBirthday_date().getMonthValue());
        assertEquals(1968, user.getBirthday_date().getYear());

        System.out.println(user.toString());
    }

    @Test
    public void addEgressTest() {
        user.addEgress(egress);

        assertTrue(user.getEgresses().contains(egress));
        System.out.println(user.toString());
    }

    @Test
    public void removeEgressTest() {
        user.addEgress(egress);

        assertTrue(user.getEgresses().contains(egress));

        user.removeEgress(egress);

        assertFalse(user.getEgresses().contains(egress));
    }

    @Test
    public void addIncomeTEst(){
        user.addIncome(income);
        assertTrue(user.getIncomes().contains(income));
        System.out.println(income);
    }

    @Test
    public void removeIncomeTest(){
        user.addIncome(income);
        assertTrue(user.getIncomes().contains(income));
        System.out.println(user.toString());

        user.removeIncome(income);
        assertFalse(user.getIncomes().contains(income));
        System.out.println(user.toString());
    }
*/
}
