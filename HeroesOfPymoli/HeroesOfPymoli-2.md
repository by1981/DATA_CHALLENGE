

```python
import pandas as pd
import os
import json
with open('purchase_data.json') as json_file:  
    data = pd.read_json(json_file)


data_df=pd.DataFrame(data)
data_df.head()
```




<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>Age</th>
      <th>Gender</th>
      <th>Item ID</th>
      <th>Item Name</th>
      <th>Price</th>
      <th>SN</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>38</td>
      <td>Male</td>
      <td>165</td>
      <td>Bone Crushing Silver Skewer</td>
      <td>3.37</td>
      <td>Aelalis34</td>
    </tr>
    <tr>
      <th>1</th>
      <td>21</td>
      <td>Male</td>
      <td>119</td>
      <td>Stormbringer, Dark Blade of Ending Misery</td>
      <td>2.32</td>
      <td>Eolo46</td>
    </tr>
    <tr>
      <th>2</th>
      <td>34</td>
      <td>Male</td>
      <td>174</td>
      <td>Primitive Blade</td>
      <td>2.46</td>
      <td>Assastnya25</td>
    </tr>
    <tr>
      <th>3</th>
      <td>21</td>
      <td>Male</td>
      <td>92</td>
      <td>Final Critic</td>
      <td>1.36</td>
      <td>Pheusrical25</td>
    </tr>
    <tr>
      <th>4</th>
      <td>23</td>
      <td>Male</td>
      <td>63</td>
      <td>Stormfury Mace</td>
      <td>1.27</td>
      <td>Aela59</td>
    </tr>
  </tbody>
</table>
</div>




```python
with open('purchase_data.json') as json_file:  
    data = pd.read_json(json_file)

Dup_data_df=pd.DataFrame(data)
#data_df=data_df.drop_duplicates(keep=False)
Dup_data_df=Dup_data_df.drop_duplicates('SN')
#Player Count
NoOfPlayers=(Dup_data_df["SN"].count())
pd.DataFrame([{'Number of Players': NoOfPlayers}])
```




<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>Number of Players</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>573</td>
    </tr>
  </tbody>
</table>
</div>




```python
#Purchasing Analysis (Total)

#pd.options.display.float_format = '${:,.2f}'.format

#Calculating Average Purchase Price
AveragePurchasePrice=data_df['Price'].mean()
AvgPrice=round(AveragePurchasePrice,2)

#AveragePurchasePrice
UniqueItems=(Dup_data_df["SN"].count())
#Calculating total number of purchases
TotalNumberofPurchases=data_df['Item Name'].count()

#Calculating total revenue
TotalRevenue=data_df['Price'].sum()
#TotalRevenue


pd.DataFrame({
    'Number Of Unique Items':[UniqueItems],
    'Average Purchase Price':pd.Series(AvgPrice).map("${:,.2f}".format),
    'Number of Purchases': [TotalNumberofPurchases],
    'Total Revenue':pd.Series(TotalRevenue).map("${:,.2f}".format)
})[["Number Of Unique Items","Average Purchase Price", "Number of Purchases","Total Revenue"]]

```




<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>Number Of Unique Items</th>
      <th>Average Purchase Price</th>
      <th>Number of Purchases</th>
      <th>Total Revenue</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>573</td>
      <td>$2.93</td>
      <td>780</td>
      <td>$2,286.33</td>
    </tr>
  </tbody>
</table>
</div>




```python
#Gender Demographics

Gendercal=Dup_data_df['Gender'].value_counts()
alepercent1=(Gendercal*100)/Dup_data_df['Gender'].count()
pd.options.display.float_format = '{:,.2f}'.format


GenderDemo1_df=pd.DataFrame({'Percent Of Players':pd.Series(alepercent1).map("{:,.2f}%".format),'Total Count':Gendercal})
GenderDemo1_df[["Total Count","Percent Of Players"]]
```




<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>Total Count</th>
      <th>Percent Of Players</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>Male</th>
      <td>465</td>
      <td>81.15%</td>
    </tr>
    <tr>
      <th>Female</th>
      <td>100</td>
      <td>17.45%</td>
    </tr>
    <tr>
      <th>Other / Non-Disclosed</th>
      <td>8</td>
      <td>1.40%</td>
    </tr>
  </tbody>
</table>
</div>




```python
#Purchasing Analysis (Gender)

grouped_Binned_Gender_df = data_df.groupby("Gender")

Gender_count=grouped_Binned_Gender_df[["Price"]].count()
Avg_Price_Gender=grouped_Binned_Gender_df[["Price"]].mean()
Total_P_Value=grouped_Binned_Gender_df[["Price"]].sum()
Normalized_Totals= Total_P_Value["Price"]/Gendercal
Gender_count_df=pd.DataFrame(Gender_count)
Gender_count_df
pd.options.display.float_format = '{:,.2f}'.format
Purchasing_Analysis_Gender_df=pd.DataFrame({'Purchase Count':Gender_count["Price"],'Average Purchase Price':Avg_Price_Gender["Price"].map("${:,.2f}".format),'Total Purchase Price':Total_P_Value["Price"].map("${:,.2f}".format),'Normalized Totals':Normalized_Totals.map("${:,.2f}".format)})
Purchasing_Analysis_Gender_df[["Purchase Count","Average Purchase Price","Total Purchase Price","Normalized Totals" ]]
```




<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>Purchase Count</th>
      <th>Average Purchase Price</th>
      <th>Total Purchase Price</th>
      <th>Normalized Totals</th>
    </tr>
    <tr>
      <th>Gender</th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>Female</th>
      <td>136</td>
      <td>$2.82</td>
      <td>$382.91</td>
      <td>$3.83</td>
    </tr>
    <tr>
      <th>Male</th>
      <td>633</td>
      <td>$2.95</td>
      <td>$1,867.68</td>
      <td>$4.02</td>
    </tr>
    <tr>
      <th>Other / Non-Disclosed</th>
      <td>11</td>
      <td>$3.25</td>
      <td>$35.74</td>
      <td>$4.47</td>
    </tr>
  </tbody>
</table>
</div>




```python
#Age Demographics

bins=[0,9.9,14.9,19.9,24.9,29.9,34.9,39.9,150]
group_names=['<10','10-14','15-19','20-24','25-29','30-34','35-39','40']
age_demo=pd.cut(data_df['Age'], bins, labels=group_names)
data_df['Binned_Age']=pd.cut(data_df['Age'], bins, labels=group_names)

total_count= data_df['Binned_Age'].value_counts()
binAgepercent1=(total_count*100)/data_df['Age'].count()
binAgepercent1_df=pd.DataFrame({'Percent Of Players':pd.Series(binAgepercent1).map("{:,.2f}%".format),'Total Count':total_count,})
binAgepercent1_df
```




<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>Percent Of Players</th>
      <th>Total Count</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>20-24</th>
      <td>43.08%</td>
      <td>336</td>
    </tr>
    <tr>
      <th>15-19</th>
      <td>17.05%</td>
      <td>133</td>
    </tr>
    <tr>
      <th>25-29</th>
      <td>16.03%</td>
      <td>125</td>
    </tr>
    <tr>
      <th>30-34</th>
      <td>8.21%</td>
      <td>64</td>
    </tr>
    <tr>
      <th>35-39</th>
      <td>5.38%</td>
      <td>42</td>
    </tr>
    <tr>
      <th>10-14</th>
      <td>4.49%</td>
      <td>35</td>
    </tr>
    <tr>
      <th>&lt;10</th>
      <td>3.59%</td>
      <td>28</td>
    </tr>
    <tr>
      <th>40</th>
      <td>2.18%</td>
      <td>17</td>
    </tr>
  </tbody>
</table>
</div>




```python
#Purchasing Analysis (Age)
Dup_data_df['Binned_Age']=pd.cut(Dup_data_df['Age'], bins, labels=group_names)
grouped_Binned_Age_df = data_df.groupby("Binned_Age")
DropDup_Binned_df=Dup_data_df.groupby('Binned_Age')
P_count_DropDup=DropDup_Binned_df[["Price"]].count()
P_count=grouped_Binned_Age_df[["Price"]].count()
Avg_Price=grouped_Binned_Age_df[["Price"]].mean()
Total_P_Value=grouped_Binned_Age_df[["Price"]].sum()
        
        #Purchasing_Analysis_df
Normalized_Totals= Total_P_Value/P_count_DropDup
P_count_df=pd.DataFrame(P_count)
P_count_df
Purchasing_Analysis_df=pd.DataFrame({'Purchase Count':P_count["Price"],
                                     'Average Purchase Price':Avg_Price["Price"].map("${:,.2f}".format),
                                     'Total Purchase Price':Total_P_Value["Price"].map("${:,.2f}".format),
                                     'Normalized Totals':Normalized_Totals["Price"].map("${:,.2f}".format),})
Purchasing_Analysis_df[["Purchase Count","Average Purchase Price","Total Purchase Price","Normalized Totals"]]

```




<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>Purchase Count</th>
      <th>Average Purchase Price</th>
      <th>Total Purchase Price</th>
      <th>Normalized Totals</th>
    </tr>
    <tr>
      <th>Binned_Age</th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>&lt;10</th>
      <td>28</td>
      <td>$2.98</td>
      <td>$83.46</td>
      <td>$4.39</td>
    </tr>
    <tr>
      <th>10-14</th>
      <td>35</td>
      <td>$2.77</td>
      <td>$96.95</td>
      <td>$4.22</td>
    </tr>
    <tr>
      <th>15-19</th>
      <td>133</td>
      <td>$2.91</td>
      <td>$386.42</td>
      <td>$3.86</td>
    </tr>
    <tr>
      <th>20-24</th>
      <td>336</td>
      <td>$2.91</td>
      <td>$978.77</td>
      <td>$3.78</td>
    </tr>
    <tr>
      <th>25-29</th>
      <td>125</td>
      <td>$2.96</td>
      <td>$370.33</td>
      <td>$4.26</td>
    </tr>
    <tr>
      <th>30-34</th>
      <td>64</td>
      <td>$3.08</td>
      <td>$197.25</td>
      <td>$4.20</td>
    </tr>
    <tr>
      <th>35-39</th>
      <td>42</td>
      <td>$2.84</td>
      <td>$119.40</td>
      <td>$4.42</td>
    </tr>
    <tr>
      <th>40</th>
      <td>17</td>
      <td>$3.16</td>
      <td>$53.75</td>
      <td>$4.89</td>
    </tr>
  </tbody>
</table>
</div>




```python
#Top Spenders

grouped_Binned_Spender_df = data_df.groupby("SN")

Spender_count=grouped_Binned_Spender_df[["Price"]].count()
Avg_Price_Spender=grouped_Binned_Spender_df[["Price"]].mean()
Total_P_Value=grouped_Binned_Spender_df[["Price"]].sum()
Spender_count_df=pd.DataFrame(Spender_count)
Spender_count_df

SP_count_df=pd.DataFrame(Spender_count)
SP_count_df
Spender_Analysis_df=pd.DataFrame({'Purchase Count':Spender_count["Price"],
                                  'Average Purchase Price':Avg_Price_Spender["Price"].map("${:,.2f}".format),
                                  'Total Purchase Value':Total_P_Value["Price"].map("${:,.2f}".format),})
Spender_Analysis_df

Top_Spenders_df=Spender_Analysis_df.sort_values("Total Purchase Value", ascending=False)
Top_Spenders_df[["Purchase Count","Average Purchase Price","Total Purchase Value"]].head()
```




<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>Purchase Count</th>
      <th>Average Purchase Price</th>
      <th>Total Purchase Value</th>
    </tr>
    <tr>
      <th>SN</th>
      <th></th>
      <th></th>
      <th></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>Qarwen67</th>
      <td>4</td>
      <td>$2.49</td>
      <td>$9.97</td>
    </tr>
    <tr>
      <th>Sondim43</th>
      <td>3</td>
      <td>$3.13</td>
      <td>$9.38</td>
    </tr>
    <tr>
      <th>Tillyrin30</th>
      <td>3</td>
      <td>$3.06</td>
      <td>$9.19</td>
    </tr>
    <tr>
      <th>Lisistaya47</th>
      <td>3</td>
      <td>$3.06</td>
      <td>$9.19</td>
    </tr>
    <tr>
      <th>Tyisriphos58</th>
      <td>2</td>
      <td>$4.59</td>
      <td>$9.18</td>
    </tr>
  </tbody>
</table>
</div>




```python
#Most Popular Items
grouped_Binned_Item_df = data_df.groupby(["Item ID","Item Name"])

Item_count=grouped_Binned_Item_df[["Price"]].count()
Price_Item=grouped_Binned_Item_df[["Price"]].mean()
Total_P_Value=grouped_Binned_Item_df[["Price"]].sum()
Item_count_df=pd.DataFrame(Item_count)
Item_count_df

PopulatItem_count_df=pd.DataFrame(Item_count)
PopulatItem_count_df
PopularItem_Analysis_df=pd.DataFrame({'Purchase Count':Item_count["Price"],
                                      'Item Price':Price_Item["Price"].map("${:,.2f}".format),
                                      'Total Purchase Value':Total_P_Value["Price"].map("${:,.2f}".format),})
PopularItem_Analysis_df

Most_PopularItem_df=PopularItem_Analysis_df.sort_values(("Purchase Count"), ascending=False)
Most_PopularItem_df[["Purchase Count","Item Price","Total Purchase Value"]].head()
```




<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th></th>
      <th>Purchase Count</th>
      <th>Item Price</th>
      <th>Total Purchase Value</th>
    </tr>
    <tr>
      <th>Item ID</th>
      <th>Item Name</th>
      <th></th>
      <th></th>
      <th></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>39</th>
      <th>Betrayal, Whisper of Grieving Widows</th>
      <td>11</td>
      <td>$2.35</td>
      <td>$25.85</td>
    </tr>
    <tr>
      <th>84</th>
      <th>Arcane Gem</th>
      <td>11</td>
      <td>$2.23</td>
      <td>$24.53</td>
    </tr>
    <tr>
      <th>31</th>
      <th>Trickster</th>
      <td>9</td>
      <td>$2.07</td>
      <td>$18.63</td>
    </tr>
    <tr>
      <th>175</th>
      <th>Woeful Adamantite Claymore</th>
      <td>9</td>
      <td>$1.24</td>
      <td>$11.16</td>
    </tr>
    <tr>
      <th>13</th>
      <th>Serenity</th>
      <td>9</td>
      <td>$1.49</td>
      <td>$13.41</td>
    </tr>
  </tbody>
</table>
</div>




```python
#Most Profitable Items

Most_ProfitableItem_df=Most_PopularItem_df["Item Price"]*PopularItem_Analysis_df["Purchase Count"]
Most_ProfitableItem_df.sort_values(ascending=False)

ProfitableItem_Analysis_df=pd.DataFrame({'Purchase Count':Item_count["Price"],
                                         'Item Price':Price_Item["Price"].map("${:,.2f}".format),
                                         'Total Purchase Price':Total_P_Value["Price"],
                                         'Profit Per Unit':Most_ProfitableItem_df})
ProfitableItem_Analysis_df=ProfitableItem_Analysis_df.sort_values('Total Purchase Price', ascending=False)
ProfitableItem_Analysis_df[[ 'Purchase Count','Item Price','Total Purchase Price']].head()
```




<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th></th>
      <th>Purchase Count</th>
      <th>Item Price</th>
      <th>Total Purchase Price</th>
    </tr>
    <tr>
      <th>Item ID</th>
      <th>Item Name</th>
      <th></th>
      <th></th>
      <th></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>34</th>
      <th>Retribution Axe</th>
      <td>9</td>
      <td>$4.14</td>
      <td>37.26</td>
    </tr>
    <tr>
      <th>115</th>
      <th>Spectral Diamond Doomblade</th>
      <td>7</td>
      <td>$4.25</td>
      <td>29.75</td>
    </tr>
    <tr>
      <th>32</th>
      <th>Orenmir</th>
      <td>6</td>
      <td>$4.95</td>
      <td>29.70</td>
    </tr>
    <tr>
      <th>103</th>
      <th>Singed Scalpel</th>
      <td>6</td>
      <td>$4.87</td>
      <td>29.22</td>
    </tr>
    <tr>
      <th>107</th>
      <th>Splitter, Foe Of Subtlety</th>
      <td>8</td>
      <td>$3.61</td>
      <td>28.88</td>
    </tr>
  </tbody>
</table>
</div>


